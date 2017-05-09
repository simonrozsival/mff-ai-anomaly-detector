"""
Anomaly detector with a sliding window.
"""

from .window import update_window
from .online_trainer import online_trainer


def delta(prev_point, next_point):
    """ Interesting is only the change in the data. """
    return next_point - prev_point if prev_point is not None else next_point


def smoothen(window, point):
    """ Apply smoothing filter. """
    # return (point - window.means) . / window.std_devs
    return point


def detect(window, next_data_point, ct=0.6):
    """ Is the next data point anomalous? """
    correlated_attributes = online_trainer(window, ct)
    anomalies = 0

    for case in correlated_attributes:
        pt = next_data_point[:, case.columns]
        if case.is_too_far(pt):
            anomalies += 1

    return anomalies > 0


def is_anomalous(window, prev_data_point, next_data_point, ct=0.6):
    """ Try to detect anomalous sensoric reading. """
    delta_point = delta(prev_data_point, next_data_point)
    smooth_point = smoothen(window, delta_point)
    skipped = False
    detected = False

    if len(window.data) >= len(next_data_point):
        detected = detect(window, smooth_point, ct=ct)
    else:
        skipped = True

    return skipped, detected, update_window(window, smooth_point)

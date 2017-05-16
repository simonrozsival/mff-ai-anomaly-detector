#!/usr/bin/env python3

"""
The unsupervised on-line anomaly detector by Simon Rozsival.
"""

import matplotlib.pyplot as plt

from .src.window import create_window
from .src.parser import parse
from .src.state import INITIAL_STATE, update_state
from .src.detector import is_anomalous

interesting_attrs = [2,3,4,11,12,13,15,16,17,18,19,20,21,22,23,24]
first_timestamp = None

def run_detector(sensoric_readings):
    """ Collect all the inputs from the stdin and analyze the data. """
    prev_data_point = None
    window = None
    state = INITIAL_STATE

    readings_timestamps = []
    readings = []

    detections_timestamps = []
    detected_anomalies = []
    ok_timestamps = []
    ok_readings = []

    # prepare the plot
    i = 0
    plt.ion()
    # plt.ylim(-10, 100)
    plt.xlabel("timestamps")
    plt.ylabel("distance")

    ax = plt.gca()
    ax.get_xaxis().get_major_formatter().set_useOffset(False)

    # [1] show that the fun is about to start!!
    print("--- anomaly detector: waiting for the start of the data stream ---")

    # [2] try to detect all the anomalies
    for reading in sensoric_readings:
        timestamp, next_data_point = parse(reading)
        next_data_point = next_data_point[interesting_attrs]

        if window is None:
            window = create_window(100, len(next_data_point))
            prev_data_point = next_data_point
            first_timestamp = timestamp
        else:
            skipped, anomaly_detected, distance, window = is_anomalous(
                window,
                prev_data_point,
                next_data_point,
                ct = 0.9
            )

            timestamp -= first_timestamp
            prev_data_point = next_data_point
            state = update_state(state, skipped, anomaly_detected, timestamp)

            # show the plots
            if i != 0:
                readings_timestamps.append([timestamp] * len(next_data_point))
                readings.append(window.data[window.size - 1])

            # plot all anomalies as well
            if anomaly_detected:
                detections_timestamps.append(timestamp)
                detected_anomalies.append(distance)
            else:
                ok_timestamps.append(timestamp)
                ok_readings.append(distance)

            # if i % 5 == 0:
            #     # plt.plot(readings_timestamps, readings)
            #     plt.plot(detections_timestamps, detected_anomalies, 'rx')
            #     plt.plot(ok_timestamps, ok_readings, 'g.')
            #     plt.pause(0.001)

            i += 1

    # plt.plot(readings_timestamps, readings)
    plt.plot(detections_timestamps, detected_anomalies, 'rx')
    plt.plot(ok_timestamps, ok_readings, 'g.')
    plt.pause(1000)

    # [2] announce end of data stream
    print("\n")
    print("--- anomaly detector: end of data stream ---")


if __name__ == "__main__":
    run_detector()

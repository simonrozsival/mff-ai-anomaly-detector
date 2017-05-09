#!/usr/bin/env python3

"""
The unsupervised on-line anomaly detector by Simon Rozsival.
"""

from .src.window import create_window
from .src.parser import parse
from .src.state import INITIAL_STATE, update_state
from .src.detector import is_anomalous


def run_detector(sensoric_readings):
    """ Collect all the inputs from the stdin and analyze the data. """
    prev_data_point = None
    window = None
    state = INITIAL_STATE

    # [1] show that the fun is about to start!!
    print("--- anomaly detector: waiting for the start of the data stream ---")

    # [2] try to detect all the anomalies
    for reading in sensoric_readings:
        if window is None:
            window = create_window(100)

        timestamp, next_data_point = parse(reading)
        skipped, anomaly_detected, window = is_anomalous(
            window,
            prev_data_point,
            next_data_point
        )

        state = update_state(state, skipped, anomaly_detected, timestamp)
        prev_data_point = next_data_point

    # [2] announce end of data stream
    print("\n")
    print("--- anomaly detector: end of data stream ---")


if __name__ == "__main__":
    run_detector()

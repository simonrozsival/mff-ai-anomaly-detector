"""
Manage the output messages for the user.
"""

import sys

OK = "ok"
ANOMALY = "ANOMALY"
SKIPPING = "collecting data"
INITIAL_STATE = (None, -1, -1)


def update_state(prev, skipped, anomaly_detected, timestamp):
    """ Update the state and print the status to the stdout """
    prev_state, prev_streak, last_change = prev
    next_state = get_next_state(prev_state, skipped, anomaly_detected)
    next_streak = None
    if next_state == prev_state:
        next_streak = prev_streak + 1
    else:
        last_change = timestamp
        next_streak = 0

    print_state(next_state, next_streak, timestamp, last_change)
    return (next_state, next_streak, last_change)


def get_next_state(prev_state, skipped, anomaly_detected):
    """ Determine the next state of the detector. """
    if prev_state is None:
        return SKIPPING
    elif skipped:
        return SKIPPING
    elif anomaly_detected:
        return ANOMALY
    else:
        return OK


def print_state(state, streak, timestamp, last_change):
    """ Print the current state of the detector. """
    msg = "{}[{}] :: {} - {}x ({}s)".format(
        "\n" if last_change == timestamp else "\r",
        last_change,
        state,
        streak,
        (timestamp - last_change) / 1000.
    )
    sys.stdout.write(msg)
    sys.stdout.flush()

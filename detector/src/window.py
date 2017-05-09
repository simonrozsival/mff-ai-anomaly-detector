"""
A sliding window of the sample readings.
"""

from collections import namedtuple
import numpy as np

Window = namedtuple(
    "Window",
    ["capacity", "data"]
)


def create_window(capacity):
    """ Creates an initial sliding window. """
    window = Window(capacity, np.array([]))
    return window


def update_window(window, point):
    """ Updates the sliding window with one new reading """
    next_data = np.append(window.data, point)
    if len(next_data) > window.capacity:
        next_data = next_data[len(next_data) - window.capacity]

    return Window(window.capacity, next_data)

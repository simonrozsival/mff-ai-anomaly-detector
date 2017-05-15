"""
A sliding window of the sample readings.
"""

from collections import namedtuple
import numpy as np

Window = namedtuple(
    "Window",
    ["size", "data"]
)


def create_window(capacity, attrs_count):
    """ Creates an initial sliding window. """
    window = Window(0, np.zeros((capacity, attrs_count)))
    return window


def update_window(window, point):
    """ Updates the sliding window with one new reading """
    if window.size == len(window.data):
        # shift the window
        next_data = np.vstack([ window.data[1:], np.zeros((1, window.data.shape[1])) ])
        next_size = window.size
    else:
        next_size = window.size + 1
        next_data = window.data

    next_data[next_size - 1] = point
    return Window(next_size, next_data)

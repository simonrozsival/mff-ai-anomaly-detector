"""
A sliding window of the sample readings.
"""

from collections import namedtuple

Window = namedtuple(
    "Window",
    ["size", "capacity", "data", "means", "variances"]
)


def create_window(size):
    """ Creates an initial sliding window. """
    window = range(size)
    return window


def update_window(window, point):
    """ Updates the sliding window with one new reading """
    return window

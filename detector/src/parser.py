"""
Parse the sensoric readings.
"""

import numpy as np


def parse(reading):
    """ Parse a line of sensoric readings starting with a timestamp """
    data = [float(x) for x in reading.split()]
    return data[0], np.array(data[1:])

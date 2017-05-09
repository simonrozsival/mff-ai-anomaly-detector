"""
Parse the sensoric readings.
"""


def parse(reading):
    """ Parse a line of sensoric readings starting with a timestamp """
    data = [float(x) for x in reading.split()]
    return data[0], data[1:]

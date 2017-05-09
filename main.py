#!/usr/bin/env python3

import os
import sys
from detector.anomaly_detector import run_detector


def main():
    # run_detector(sys.stdin)
    file_path = "{}/mock-data/mergedata_lag_40_convolution.tsv".format(os.getcwd())
    print(file_path)
    with open(file_path) as mock:
        run_detector(mock)


if __name__ == '__main__':
    main()

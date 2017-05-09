"""
Detect correlated attributes.
"""

import numpy as np
import sc


def online_trainer(window, ct=0.6):
    """ Detect correlated attributes and prepare the metric for detection of outliers. """
    correlations = correlated_attributes(window.data, ct=ct)
    is_too_far = get_metric(window, correlations)
    return zip(correlations, is_too_far)


def correlated_attributes(data, ct=0.6):
    """ detect the attributes which are correlated """
    if not data:
        return []

    correlations = []
    attrs_count = len(data[0])
    for i in range(attrs_count):
        attrs = []
        for j in range(attrs_count):
            pearson = np.corrcoef(data[:, i], data[:, j])[0, 1]
            if abs(pearson):
                attrs.append(j)
        if len(attrs) > 1 and attrs not in correlations:
            correlations.append(attrs)

    return correlations


def get_metric(window, correlations):
    metrics = []

    for attrs in correlations:
        data = window.data[:, attrs]
        icov = np.inv(np.cov(data))
        is_too_far = lambda pt => 

    return metrics

"""
Detect correlated attributes.
"""

import numpy as np
from scipy.spatial.distance import mahalanobis


def online_trainer(window, ct=0.6):
    """ Detect correlated attributes and prepare the metric for detection of outliers. """
    correlations = correlated_attributes(window.data, ct=ct)
    return [(attrs, get_metric(window, attrs)) for attrs in correlations]


def correlated_attributes(data, ct=0.6):
    """ detect the attributes which are correlated """
    if not data.any():
        return []

    correlations = []
    attrs_count = data.size
    for i in range(attrs_count):
        attrs = []
        for j in range(attrs_count):
            pearson = np.corrcoef(data[:, i], data[:, j])[0, 1]
            if abs(pearson) > ct:
                attrs.append(j)
        if len(attrs) > 1 and attrs not in correlations:
            correlations.append(attrs)

    return correlations


def get_metric(window, attrs):
    """ Get a metric for a given set of attributes. """
    data = window.data[:, attrs]
    return get_too_far(data)


def get_too_far(data):
    """ Create a lambda expression which determines if a point is too far from the data. """
    inverse_covariance_matrix = np.inv(np.cov(data))
    means = np.mean(data, axis=1)
    distances = [mahalanobis(
        x, means, inverse_covariance_matrix) for x in data]
    return lambda x: mahalanobis(x, means, inverse_covariance_matrix) > min(distances)

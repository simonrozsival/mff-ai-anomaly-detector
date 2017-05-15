"""
Detect correlated attributes.
"""

from collections import namedtuple
import numpy as np
from numpy.linalg import LinAlgError
from scipy.spatial.distance import mahalanobis

CorrelatedAttributes = namedtuple(
    "CorrelatedAttributes",
    ["columns", "metric"]
)

Metric = namedtuple(
    "Metric",
    ["dist", "distances", "is_too_far"]
)


def online_trainer(window, ct=0.6):
    """ Detect correlated attributes and prepare the metric for detection of outliers. """
    data = window.data[0:window.size]
    correlations = correlated_attributes(data, ct=ct)
    return [CorrelatedAttributes(attrs, get_metric(data, attrs)) for attrs in correlations]


def correlated_attributes(data, ct=0.6):
    """ detect the attributes which are correlated """
    if not data.any():
        return []

    correlations = []
    attrs_count = data.shape[1]
    for i in range(attrs_count):
        attrs = []
        for j in range(attrs_count):
            pearson = np.corrcoef(data[:, i], data[:, j])[0, 1]
            if abs(pearson) > ct:
                attrs.append(j)
        if len(attrs) > 1 and attrs not in correlations:
            correlations.append(attrs)

    return correlations


def get_metric(data, attrs):
    """ Get a metric for a given set of attributes. """
    return get_too_far(data[:, attrs])


def get_too_far(data):
    """ Create a lambda expression which determines if a point is too far from the data. """
    # inverse_covariance_matrix = np.linalg.inv(np.cov(np.transpose(data)))
    inverse_covariance_matrix = np.linalg.pinv(np.cov(np.transpose(data))) # pseudo-inverse matrix
    means = np.mean(data, axis=0)
    distances = [mahalanobis(x, means, inverse_covariance_matrix) for x in data]
    dist = lambda x: mahalanobis(x, means, inverse_covariance_matrix)
    return Metric(dist, distances, lambda x: dist(x) > max(distances))

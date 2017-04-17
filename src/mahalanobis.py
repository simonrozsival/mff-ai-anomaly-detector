from numpy import inv, cov, mean
from scipy.spatial.distance import mahalanobis

def distance(x, data):
    means = mean(data, axis=1)
    icov = inv(cov(data))
    return mahalanobis(x, means, icov)


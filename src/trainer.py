from numpy import abs
from scipy.stats import pearsonr
from './mahalanobis' import distance

def online_trainer(data, ct):
    CS = correlated_attributes(data, ct)
    TS = thresholds(CS, data)
    return zip(CS, TS)

def correlated_attributes(data, ct):
    CS = []
    for i in range(len(data[0])):
        A = []
        for j in range(len(data[0])):
            list(p, _) = pearsonr(data[:, i], data[:, j])
            if abs(p) < ct:
                A.append(j)
        if len(A) > 1:
            CS.append(A)
    return CS

def thresholds(CS, data):
    TS = []
    for i in range(len(CS)):
        sub_data = cols(data, CS[i])
        threshold = max(map(lambda x: distance(x, sub_data), sub_data))
        TS.append(threshold)
    return TS

def cols(data, attrs):
    return [[row[a] for a in attrs] for row in data]
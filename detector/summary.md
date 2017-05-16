# Summary

- I managed to implement the unsupervised learning algorithm from the paper

## Pros

- The algorithm is not dependent on one particular type of drone or any specific kind of device with sensors
- The implementation seems to work on the test sets
- The algorithm has potential to be used in online systems

## Cons

- too slow - not usable for online anomaly detection
- I wasn't able to implement the smoothing filter proposed in the paper (division by zero?)

## What could be improved?

- optimization of the code
    - more sophisticated calculation of covariance matrix and the inverse matrix - update the sliding window
- finding better values for the parameters
    - sliding window size
    - threshold parameter
- run more tests
    - I didn't try it on artificial data
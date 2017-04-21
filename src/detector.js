import { parseSensorReading } from './parser';
import { shift, create } from './slidingWindow';
import { isAnomalous } from './isAnomalous';
import { delta, smooth } from './smoothing';

export const init = (history, data = []) => create(history, data);

const detect = (prev, next, window, ct = 0.6, onlyColumns = null) => {
  // preprocess the input
  const parsed = parseSensorReading(next);
  const deltaInput = delta(parseSensorReading(prev), parsed);
  const smoothInput = smooth(deltaInput, window);

  const input = onlyColumns !== null
    ? cols(onlyColumns, smoothInput)
    : smoothInput;

  // try to detect the anomaly
  return window.size >= input.length && isAnomalous(input, window, ct)
    ? { anomalyDetected: true, window }
    : {
        skipped: window.size < input.length,
        anomalyDetected: false,
        window: shift(input, window)
      };
};

export default (prev, next, window, ct = 0.6) => {
  if (!next || next.length === 0) {
    throw new Error('Invalid (null or empty) raw reading from the sensors.');
  }

  // in case of first run initialise the window
  if (window === null) {
    throw new Error('The sliding window is not initialised.');
  }

  // in case of first run initialise the window
  if (prev === null) {
    throw new Error('The sliding window is not initialised.');
  }

  return detect(prev, next, window, ct);
};

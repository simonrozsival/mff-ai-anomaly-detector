import { parseSensorReading } from './parser';
import { shift, create } from './slidingWindow';
import { isAnomalous } from './isAnomalous';
import { delta, smooth } from './smoothing';

export default (prevReading, reading, window) => {
  if (!reading || reading.length === 0) {
    throw new Error('Invalid (null or empty) raw reading from the sensors.');
  }

  const input = parseSensorReading(reading);
  const prev = parseSensorReading(prevReading);

  if (window === null) {
    window = create(100);
  }

  // preprocess the input
  const deltaInput = delta(prev, input);
  const smoothInput = smooth(deltaInput, window);

  return isAnomalous(smoothInput, window)
    ? { anomalyDetected: true, window }
    : { anomalyDetected: false, window: shift(smoothInput, window) };
};

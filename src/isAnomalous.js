import { onlineTrainer } from './onlineTrainer';

import { cols } from './math';

/**
 * Check if the new input from the sensors is not an anomaly with respect to the previously
 * recorded data stored in the sliding window.
 * @param {Array} input The new input from the sensors.
 * @param {Array} window The sliding window.
 * @returns {boolean} The input is anomalous or not.
 */
export const isAnomalous = (input, window, ct = 0.6) => {
  const sets = onlineTrainer(window, ct);
  let anomalies = [];

  for (let { cs, ts, metric } of sets) {
    const pt = cs.map(col => input[col]);
    const dist = metric.distance(pt);
    if (dist > ts) {
      anomalies.push(cs);
      // break; // if I want to collect all the anomalies and deduce something, then this early break should be removed
    }
  }

  // future version: Deduce the type of anomaly here

  // return anomalies.length > 0;
  return anomalies.length > 0;
};

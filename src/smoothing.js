import { variances } from './math';

export const delta = (prev, next) =>
  (prev === null ? next : next.map((n, i) => n - prev[i]));

/**
 * Smoothen the input vector
 * @param {Array} X The vector of the data
 * @param {Object} window The data window
 * @returns {Array} The smoothened vector
 */
export const smooth = (X, { data, means }) => {
  if (!data || data.length === 0) {
    return X; // no history for smoothing
  }

  const vars = variances({ data, means });
  return X.map((x, i) => (x - means[i]) / vars[i]);
};

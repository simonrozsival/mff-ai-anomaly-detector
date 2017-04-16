import distance from './mahalanobis';
import { mean, dot, col, cols } from './math';

/**
 *
 * @param {Array} data The data
 * @param {Number} ct The correlation threshold constant
 * @returns {Array} The sets of correlated attributes with the threshold distance
 */
export const onlineTrainer = (data, ct) => {
  const correlations = correlationDetector(data, ct);
  const withThresholds = computeThresholds(correlations, data);

  return withThresholds;
};

/**
 * Detect the correlated attributes in the data.
 * @param {Array} data
 * @param {Number} ct The correlation threshold constant
 * @returns {Array} The array of correlated attributes with their thresholds
 */
const corelationDetector = (data, ct = 0.005) => {
  if (data.length === 0) {
    return []; // no items === no correlation
  }

  let correlation = [];
  const attributesCount = data[0].length;

  for (let i = 0; i < attributesCount; ++j) {
    let attrs = [];
    for (let j = 0; j < attributesCount; ++j) {
      const A = col(data, i);
      const B = col(data, j);
      const p = pearsonCorrelationCoefficient(A, B);
      if (Math.abs(p) > ct) {
        attrs.push(j);
      }
    }

    if (attrs.length > 1) {
      correlation.push(attrs);
    }
  }

  return correlation;
};

/**
 * Calculate the pearson correlation coefficient of the two vectors
 * @param {Array} X Vector of numbers
 * @param {Array} Y Vector of numbers
 * @returns {Number} The correlation coefficient
 */
const pearsonCorrelationCoefficient = (X, Y) => {
  const mx = mean(X);
  const my = mean(Y);
  const mX = X.map(x => x - mx);
  const mY = Y.map(y => y - my);
  return dot(mX, mY) / Math.sqrt(dot(mX, mX) * dot(mY, mY));
};

/**
 * Attach the thresholds to each set of correlated attributres.
 * @param {Array} correlatations
 * @param {Array} data
 * @returns {Array}
 */
const withThresholds = (correlatations, data) =>
  correlatations.map(CS => [CS, threshold(CS, data)]);

/**
 * Calculate the thresholds for each set of correlated attributes.
 * @param {Array} CS The sets of correlated attributes
 * @param {Array} data The whole dataset
 */
const threshold = (CS, data) =>
  CS.map(cs => {
    const selectedColumnsOnly = cols(data, cs);
    const distances = data.map(item => disatnce(item, data));
    return Math.max(...distance);
  });

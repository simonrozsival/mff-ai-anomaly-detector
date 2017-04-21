import mahalanobis from '../../mahalanobis';
import { dot, col, cols } from './math';

/**
 * Detect the correlated attributes in the data.
 * @param {Array} data
 * @param {Number} ct The correlation threshold constant
 * @returns {Array} The array of correlated attributes with their thresholds
 */
const correlationDetector = ({ data, means }, ct) => {
  if (data.length === 0) {
    return []; // no items === no correlation
  }

  let correlation = [];
  const attributesCount = data[0].length;

  for (let i = 0; i < attributesCount; ++i) {
    let attrs = [];
    for (let j = 0; j < attributesCount; ++j) {
      const A = col(data, i);
      const B = col(data, j);
      const p = pearsonCorrelationCoefficient(A, means[i], B, means[j]);
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
 * @param {Number} mx Mean of X
 * @param {Array} Y Vector of numbers
 * * @param {Number} my Mean of Y
 * @returns {Number} The correlation coefficient
 */
export const pearsonCorrelationCoefficient = (X, mx, Y, my) => {
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
const attachThresholds = (correlatations, data) =>
  correlatations.map(CS => [CS, threshold(CS, data)]);

/**
 * Calculate the thresholds for each set of correlated attributes.
 * @param {Array} CS The sets of correlated attributes
 * @param {Array} data The whole dataset
 */
const threshold = (CS, data) =>
  CS.map(cs => Math.max(...mahalanobis(cols(data, cs)).all()));

/**
 *
 * @param {Array} data The data
 * @param {Number} ct The correlation threshold constant
 * @returns {Array} The sets of correlated attributes with the threshold distance
 */
export const onlineTrainer = ({ data, means }, ct = 0.6) => {
  const correlations = correlationDetector({ data, means }, ct);
  return attachThresholds(correlations, data);
};

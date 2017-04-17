/**
 * Calculate the mean of the numbers
 * @param {Array} X A vecvtor
 * @returns {Number} The mean value
 */
export const mean = X =>
  X.length === 0 ? 0 : X.reduce((acc, x) => acc + x, 0) / X.length;

/**
 * Calculate the means of the columns in the data matrix.
 * @param {Array} data The data matrix
 * @returns {Array} Means of the columns
 */
export const means = data =>
  data && data.length > 0
    ? range(data[0].length).map(i => col(data, i)).map(mean)
    : [];

const range = len => [...Array(len).keys()];

/**
 * Remove one entry and add one new
 * @param {Array} means
 * @param {Number} size
 * @param {Array} removed removed item
 * @param {Array} input added item
 * @returns {Array} The shifted means
 */
export const shiftMeans = (means, size, removed, input) =>
  means.map((avg, i) => {
    const remove = removed !== null && removed.length > 0;
    const wr = remove ? removed[i] / size : 0;
    const ds = remove ? 0 : 1; // does the size of the data increase?
    const wi = input[i] / (size + ds);
    const wa = avg * (size / (size + ds));
    return wa + wi - wr;
  });

/**
 * Calculate the dot product of the two vectors
 * @param {Array} X
 * @param {Array} Y
 * @returns {Number} The dot (scalar) product
 */
export const dot = (X, Y) => {
  if (X.length !== Y.length) {
    throw new Error(
      `The lengths of X and Y do not match (${X.length} !== ${Y.length})`
    );
  }

  let product = 0;
  for (let i = 0; i < X.length; ++i) {
    product += X[i] * Y[i];
  }

  return product;
};

/**
 * Take only a single column from the data.
 * @param {Array} data
 * @param {Number} c
 * @returns {Array} The vector of values of the given column
 */
export const col = (data, c) => data.map(item => item[c]);

/**
 * Select only some colums of the data.
 * @param {Array} data The input data
 * @param {Array} cs The columns to be selected
 * @returns {Array} The data with only specific columns
 */
export const cols = (data, cs) => data.map(item => cs.map(c => item[c]));

/**
 * Calculate the variances of the data.
 * @param {Object} window
 * @returns {Array} Variances
 */
export const variances = ({ data, means }) =>
  means.map((mean, i) => variance(col(data, i), mean));

/**
 * Calculate the standard deviations of the data.
 * @param {Object} window
 * @returns {Array} Standard deviations
 */
export const stddevs = window => variances(window).map(Math.sqrt);

/**
 * Calculate the variance of the vector.
 * @param {Array} X The vector
 * @param {Number} m The mean of the vector
 * @returns {Number} The variance of the numbers of the vector
 */
export const variance = (X, m) =>
  X.map(x => (x - m) ** 2).reduce((acc, x) => acc + x) / X.length;

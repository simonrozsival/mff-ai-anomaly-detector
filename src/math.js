/**
 * Calculate the mean of the numbers
 * @param {Array} X A vecvtor
 * @returns {Number} The mean value
 */
export const mean = X =>
  X.length === 0 ? 0 : X.reduce((acc, x) => acc + x, 0) / X.length;

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

/**
 * Process the raw data from the sensors and return an array of preprocessed
 * data which are ready to be fed to the anomaly detector.
 * @param {string} line The raw input from the sensors
 */
export const parseSensorReading = line => {
  const tokens = line.split(/\t/);
  if (!isValid(tokens)) {
    throw new Error(`invalid sensoric reading '${line}'`);
  }
  return normalize(tokens);
};

/**
 * Preprocess the array of values from the sensors.
 * @param {Array} attributes Array of string inputs
 */
const normalize = attributes => {
  return attributes.map(Number);
};

/**
 * Check whether the tokens are only numbers.
 * @param {Array} attributes The individual numbers of the readings
 */
const isValid = attributes =>
  attributes.reduce(
    (isValid, item) => isValid && Number(item) === parseFloat(item),
    true
  );

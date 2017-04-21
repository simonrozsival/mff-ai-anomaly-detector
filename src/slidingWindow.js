import { means, shiftMeans } from './math';

/**
 * Create a window with the given capacity.
 * @param {Object} capacity The capacity of the window
 */
export const create = (capacity, data = []) => {
  if (data.length >= capacity) {
    [data] = trim(data, capacity);
  }

  return {
    capacity,
    size: data.length,
    data,
    means: means(data)
  };
};

/**
 * Add a new item to the sliding window.
 * @param {Array} input
 * @param {Array} window
 * @returns {Array} New window
 */
export const shift = (input, { capacity, size, data, means: oldMeans }) => {
  let removed = [];

  // remove an item if the capacity is exceeded
  if (size >= capacity) {
    [data, removed] = trim(data, capacity - 1); // remove the entries which should be forgotten
  }

  // add the new item
  data = [...data, input];

  return {
    capacity,
    size: data.length,
    data,
    means: !oldMeans || oldMeans.length === 0 || removed > 1 // the means might not have been calculated yet (when we started from an emty window)
      ? means(data) // too radical change, calculate the means from scratch
      : shiftMeans(
          oldMeans,
          size,
          removed.length === 1 ? removed[0] : null,
          input
        ) // add one, remove at most one
  };
};

/**
 * Remove as many items as needed to return the data object with the desired number of the last entries in the data array.
 * @param {Array} data
 * @param {number} desiredItemsCount
 * @returns {Array} The remaining data and the removed data
 */
export const trim = (data, desiredItemsCount) => {
  if (desiredItemsCount >= data.length) {
    return [data, []];
  }

  return [
    data.slice(data.length - desiredItemsCount),
    data.slice(0, data.length - desiredItemsCount)
  ];
};

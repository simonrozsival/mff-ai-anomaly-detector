/**
 * Create a window with the given capacity.
 * @param {Object} capacity The capacity of the window
 */
export const create = (capacity, data = []) => {
  if (data.length >= capacity) {
    data = trim(data, capacity);
  }

  return {
    capacity,
    size: data.length,
    data
  };
};

/**
 * Add a new item to the sliding window.
 * @param {Array} input
 * @param {Array} window
 * @return {Array} New window
 */
export const shift = (input, { capacity, size, data }) => {
  if (size >= capacity) {
    data = trim(data, capacity - 1); // remove the entries which should be forgotten
  }

  return {
    capacity,
    size: data.length + 1,
    data: [...data, input]
  };
};

/**
 * Remove as many items as needed to return the data object with the desired number of the last entries in the data array.
 * @param {Array} data
 * @param {number} desiredItemsCount
 */
export const trim = (data, desiredItemsCount) => {
  if (desiredItemsCount >= data.length) {
    return data;
  }

  return [...data].splice(data.length - desiredItemsCount);
};

import { expect } from 'chai';

import { create, shift, trim } from '../../src/slidingWindow';

describe('Sliding window', () => {
  it('must trim the window to a desired size', () => {
    const data = [[1], [2], [3], [4], [5]];
    expect(trim(data, 1)).to.eql([[5]]);
    expect(trim(data, 2)).to.eql([[4], [5]]);
    expect(trim(data, 3)).to.eql([[3], [4], [5]]);
    expect(trim(data, 4)).to.eql([[2], [3], [4], [5]]);
    expect(trim(data, 5)).to.eql([[1], [2], [3], [4], [5]]);
    expect(trim(data, 100)).to.eql([[1], [2], [3], [4], [5]]);
  });

  it('must initialise a new empty window', () => {
    const x = [1, 2, 3];
    const window = create(10);
    expect(window).to.eql({
      capacity: 10,
      size: 0,
      data: []
    });
  });

  it('must initialise a new window with initial data', () => {
    const x = [1, 2, 3];
    const window = create(10, [x]);
    expect(window).to.eql({
      capacity: 10,
      size: 1,
      data: [x]
    });
  });

  it('must append the next reading to the current window without removing the first entry, when the capacity of the window has not been reached yet', () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];
    const window = create(2, [x]);
    const updatedWindow = shift(y, window);
    expect(updatedWindow).to.eql({
      capacity: 2,
      size: 2,
      data: [x, y]
    });
  });

  it('must remove the first entry when a new item is added to maintain the size of the window', () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];
    const z = [7, 8, 9];
    const window = create(2, [x, y]);
    const updatedWindow = shift(z, window);
    expect(updatedWindow).to.eql({
      capacity: 2,
      size: 2,
      data: [y, z]
    });
  });

  it('must remove as many entries as needed to maintain the size of the window', () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];
    const z = [7, 8, 9];
    const window = create(1, [x, y]);
    const updatedWindow = shift(z, window);
    expect(updatedWindow).to.eql({
      capacity: 1,
      size: 1,
      data: [z]
    });
  });

  it('must build the window gradually', () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];
    const z = [7, 8, 9];
    const window = shift(z, shift(y, shift(x, create(1))));
    expect(window).to.eql({ capacity: 1, size: 1, data: [z] });
  });
});

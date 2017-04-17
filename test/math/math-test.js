import chai from 'chai';
import roughly from 'chai-roughly';

import { mean, means, shiftMeans, dot, col, cols } from '../../src/math';

chai.use(roughly);
const { expect } = chai;

describe('Math', () => {
  it('must calculate mean of values well', () => {
    expect(mean([1, 2, 3, 4, 5])).to.equal(3);
    expect(mean([1, 2, 3])).to.equal(2);
  });

  it('must calculate dot product correctly', () => {
    expect(dot([], [])).to.equal(0);
    expect(dot([1, 2, 3], [9, 8, 7])).to.equal(46);
  });

  it('must take a single column of the matrix', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(col(matrix, 0)).to.eql([1, 4, 7]);
    expect(col(matrix, 1)).to.eql([2, 5, 8]);
    expect(col(matrix, 2)).to.eql([3, 6, 9]);
  });

  it('must take a some columns of the matrix', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(cols(matrix, [0])).to.eql([[1], [4], [7]]);
    expect(cols(matrix, [1])).to.eql([[2], [5], [8]]);
    expect(cols(matrix, [2])).to.eql([[3], [6], [9]]);
    expect(cols(matrix, [0, 1])).to.eql([[1, 2], [4, 5], [7, 8]]);
    expect(cols(matrix, [1, 2])).to.eql([[2, 3], [5, 6], [8, 9]]);
    expect(cols(matrix, [0, 2])).to.eql([[1, 3], [4, 6], [7, 9]]);
    expect(cols(matrix, [0, 1, 2])).to.eql(matrix);
  });

  it('must calculate means of the columns', () => {
    expect(means([])).to.eql([]);
    expect(means([[1, 2, 3]])).to.eql([1, 2, 3]);

    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const expectedMeans = [4, 5, 6];
    expect(means(matrix)).to.eql(expectedMeans);
  });

  describe('moving average', () => {
    it('must correctly calculate the new means when an item is added but none is removed', () => {
      const means = [1, 2, 3];
      const size = 4;
      const input = [5, 5, 5];

      expect(shiftMeans(means, size, null, input)).to.roughly.eql([
        1.8,
        2.6,
        3.4
      ]);
    });

    it('must not change the means when the same item is added as removed', () => {
      const means = [1, 2, 3];
      const size = 4;
      const x = [5, 5, 5];

      expect(shiftMeans(means, size, x, x)).to.eql(means);
    });

    it('must recalculate the means when a different item is added than the one removed', () => {
      const means = [1, 2, 3];
      const size = 4;
      const input = [5, 5, 5];
      const removed = [1, 1, 1];

      expect(shiftMeans(means, size, removed, input)).to.roughly.eql([2, 3, 4]);
    });
  });
});

import { expect } from 'chai';
import { mean, dot, col, cols } from '../../src/math';

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
});

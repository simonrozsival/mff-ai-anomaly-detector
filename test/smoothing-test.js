import { expect } from 'chai';

import { delta, smooth } from '../src/smoothing';

describe('Smoothing', () => {
  it('must be cool with no prev record', () => {
    expect(delta(null, [1, 2, 3])).to.eql([1, 2, 3]);
  });

  it('must calculate delta between two records', () => {
    expect(delta([1, 2, 3], [1, 2, 3])).to.eql([0, 0, 0]);
    expect(delta([1, 1, 1], [2, 2, 3])).to.eql([1, 1, 2]);
    expect(delta([2, 2, 3], [1, 1, 1])).to.eql([-1, -1, -2]);
    expect(delta([1, 2, 3], [3, 2, 1])).to.eql([2, 0, -2]);
  });

  it('must smoothen the data in each dimension', () => {
    const data = [
      [1, 0.01, 123455],
      [2, 0.009, 123415],
      [3, 0.011, 123434],
      [4, 0.01, 123428],
      [5, 0.012, 123461]
    ];

    const means = [3, 0.0104, 123438.6];
    const variances = [2, 0.00000104, 292.23999999999995];

    const X = [10, 1, 123477];
    const smoothened = smooth(X, { data, means });
    const expected = X.map((x, i) => (x - means[i]) / Math.sqrt(variances[i]));

    expect(smoothened).to.roughly.eql(expected);
  });

  it('must smoothen the data in each dimension', () => {
    const data = [[0], [0]];

    const means = [0];
    const variances = [0];

    const X = [1];
    const smoothened = smooth(X, { data, means });

    expect(smoothened).to.eql([0]);
  });
});

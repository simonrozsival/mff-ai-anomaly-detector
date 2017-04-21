import { expect } from 'chai';
import {
  pearsonCorrelationCoefficient,
  onlineTrainer
} from '../../src/onlineTrainer';
import { mean } from '../../src/math';

describe('Training test', () => {
  it('must behave well on empty data', () => {
    expect(onlineTrainer({ data: [], means: [] })).to.eql([]);
  });

  it('must calculate pearson correlation coefficient well', () => {
    const cases = [
      {
        X: [1, 2, 3, 4, 5],
        Y: [1, 2, 3, 4, 5],
        p: 1
      },
      {
        X: [1, 2, 3, 4, 5],
        Y: [5, 4, 3, 2, 1],
        p: -1
      },
      {
        X: [10, 54, 12, 0.123, 455],
        Y: [12.25, 23.45, 34.56, 45.67, 56.78],
        p: 0.6738
      }
    ];

    cases.map(({ X, Y, p }) => {
      const r = pearsonCorrelationCoefficient(X, mean(X), Y, mean(Y));
      const rounded = Math.round(r * 10000) / 10000;
      expect(rounded).to.equal(p);
    });
  });
});

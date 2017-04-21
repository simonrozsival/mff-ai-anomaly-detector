import { expect } from 'chai';
import detector from '../src/detector';

describe('Detector', () => {
  it('must reject invalid input', () => {
    expect(() => detector(null, null)).to.throw();
    expect(() => detector(null, '')).to.throw();
    expect(() => detector(null, 'abcde')).to.throw();
    expect(() => detector(null, '1 2 3')).to.throw();
    expect(() => detector(null, '1490714194522	7	a')).to.throw(); // eslint-disable-line
  });
});

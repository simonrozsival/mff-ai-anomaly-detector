import { expect } from 'chai';
import { parseSensorReading as parse } from '../../src/parser';

describe('Parser', () => {
  it('must read valid line of readings', () => {
    const reading = '1	2	3	4	5';
    expect(parse(reading)).to.eql([1, 2, 3, 4, 5]);
  });

  it('must read floats', () => {
    const reading = '1.2345	2.4567890	3123.2313123';
    expect(parse(reading)).to.eql([1.2345, 2.4567890, 3123.2313123]);
  });

  it('must report invalid reading when some of the tokens are not nubemrs', () => {
    const reading = '1	2	3	d	5';
    expect(() => parse(reading)).to.throw();
  });

  it('must report invalid when a different separator than tabulator is used', () => {
    const reading = '1  2  3  4  5';
    expect(() => parse(reading)).to.throw();
  });
});

import { expect } from 'chai';
import { parseSensorReading as parse } from '../src/parser';

describe('Parser', () => {
  it('must read valid line of readings and remove the first token (timestamp)', () => {
    const reading = '123456	1	2	3	4	5'; // eslint-disable-line
    expect(parse(reading)).to.eql([123456, 1, 2, 3, 4, 5]);
  });

  it('must read floats', () => {
    const reading = '123456	1.2345	2.4567890	3123.2313123'; // eslint-disable-line
    expect(parse(reading)).to.eql([123456, 1.2345, 2.4567890, 3123.2313123]);
  });

  it('must report invalid reading when some of the tokens are not nubemrs', () => {
    const reading = '1	2	3	d	5'; // eslint-disable-line
    expect(() => parse(reading)).to.throw();
  });

  it('must report invalid when a different separator than tabulator is used', () => {
    const reading = '1  2  3  4  5';
    expect(() => parse(reading)).to.throw();
  });

  it('must read actual data correctly', () => {
    const input =
      '1490714194522	7	42	0	0	0	0	0	0.0	0.0	0.0	0.0	-2.0	0.0	142745.0	0	2.147484302520752	-0.4378197193145752	0.0	2052.0	2044.0	2584.0	0	0	0	0	0'; // eslint-disable-line
    const expectedReading = [
      1490714194522,
      7,
      42,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      -2,
      0,
      142745,
      0,
      2.147484302520752,
      -0.4378197193145752,
      0,
      2052,
      2044,
      2584,
      0,
      0,
      0,
      0,
      0
    ];

    expect(parse(input)).to.eql(expectedReading);
  });
});

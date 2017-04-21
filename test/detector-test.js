import { expect } from 'chai';
import detector, { init } from '../src/detector';

import { data } from './detector-test-data';

describe('Detector', () => {
  it('must reject invalid input', () => {
    expect(() => detector(null, null)).to.throw();
    expect(() => detector(null, '')).to.throw();
    expect(() => detector(null, 'abcde')).to.throw();
    expect(() => detector(null, '1 2 3')).to.throw();
    expect(() => detector(null, '1490714194522	7	a')).to.throw(); // eslint-disable-line
  });

  it('must detect anomaly', () => {
    const window = init(data.length, data);

    const prev =
      '1490714194620	7	42	-15	-63	-85	99501	295	0.0	0.0	0.0	0.0	-12.0	-5.0	142745.0	0	0.42298054695129395	-0.08848905563354492	0.0	2052.0	2044.0	2580.0	70	70	70	70	130837402';
    const next =
      '1490714194626	7	42	-15	-63	-85	99503	295	0.0	0.0	0.0	0.0	-13.0	-5.0	142745.0	0	0.3915179669857025	-0.08585000783205032	0.0	2052.0	2044.0	2580.0	70	70	70	70	130842468';

    let { anomalyDetected, window: nextWindow } = detector(prev, next, window);
    expect(anomalyDetected).to.equal(true);
  });

  it('must detect malfunctioning sensor', () => {
    const window = init(data.length, data);

    const prev =
      '1490714194620	7	42	-15	-63	-85	99501	295	0.0	0.0	0.0	0.0	-12.0	-5.0	142745.0	0	0.42298054695129395	-0.08848905563354492	0.0	2052.0	2044.0	2580.0	70	70	70	70	130837402';
    const next =
      '1490714194626	7	42	-15	-63	-85	99503	295	0.0	0.0	0.0	0.0	-13.0	-5.0	142745.0	0	0.3915179669857025	-0.08585000783205032	0.0	2052.0	2044.0	0	70	70	70	70	130842468';

    let { anomalyDetected, window: nextWindow } = detector(prev, next, window);
    expect(anomalyDetected).to.equal(true);
  });

  it('must detect OK record', () => {
    const window = init(data.length, data);

    const prev =
      '1490714194559	7	42	-16	-68	-94	99506	295	0.0	0.0	0.0	0.0	-7.0	-3.0	142744.0	0	1.3409078121185303	-0.281855046749115	0.0	2052.0	2044.0	2580.0	70	70	70	70	130777435';
    const next =
      '1490714194559	7	42	-16	-68	-94	99506	295	0.0	0.0	0.0	0.0	-7.0	-3.0	142744.0	0	1.3409078121185303	-0.281855046749115	0.0	2052.0	2044.0	2580.0	70	70	70	70	130777435';

    let { anomalyDetected, window: nextWindow } = detector(prev, next, window);
    expect(anomalyDetected).to.equal(false);
  });
});

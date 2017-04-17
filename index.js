import fs from 'fs';
import readline from 'readline';

import {
  parseSensorReading,
  shiftWindow,
  isAnomalous,
  delta,
  smooth
} from './src';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

let window = null; // sliding window - the history of the nominal points (sensoric readings)
let prev = null;

rl.on('line', line => {
  const input = parseSensorReading(line);
  const deltaInput = delta(prev, input);
  const smoothInput = smooth(deltaInput, window);

  if (isAnomalous(smoothInput, window)) {
    rl.write(`Anomaly detected: ${line}`);
  } else {
    window = shiftWindow(data); // the window might contain only nominal data
    prev = input;
  }
});

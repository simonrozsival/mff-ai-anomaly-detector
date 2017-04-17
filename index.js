import fs from 'fs';
import readline from 'readline';

import { parseSensorReading, shiftWindow, isAnomalous, smooth } from './src';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

let window = null; // sliding window - the history of the nominal points (sensoric readings)
let prev = null;

rl.on('line', line => {
  const data = parseSensorReading(line);

  if (isAnomalous(smooth(prev, data), window)) {
    rl.write(`Anomaly detected: ${line}`);
  } else {
    window = shiftWindow(data); // the window might contain only nominal data
  }

  prev = data;
});

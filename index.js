import fs from 'fs';
import readline from 'readline';

import { parseSensorReading, shiftWindow, detectAnomaly } from './src';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

let window = null; // sliding window - the history of the nominal points (sensoric readings)

rl.on('line', line => {
  const data = parseSensorReading(line);

  if (detectAnomaly(data, window)) {
    rl.write(`Anomaly detected: ${line}`);
  } else {
    window = shiftWindow(data); // the window might contain only nominal data
  }
});

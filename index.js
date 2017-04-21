import readline from 'readline';
import detect from './src';

const rl = readline.createInterface({
  input: process.stdin
});

let window = null;
let prev = null;

rl.on('line', line => {
  const { anomalyDetected, window: nextWindow } = detect(prev, line, window);
  if (anomalyDetected) {
    rl.write(`Anomaly: ${line}`);
  } else {
    window = nextWindow;
    prev = line;
  }
});

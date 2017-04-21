import readline from 'readline';
import detect from './src';

const rl = readline.createInterface({
  input: process.stdin
});

let window = null;
let prev = null;
let streak = 0;

rl.on('line', line => {
  const { anomalyDetected, window: nextWindow } = detect(prev, line, window);
  if (anomalyDetected) {
    process.stdout.write(`\nAnomaly: ${line}\n`);
    streak = 0;
  } else {
    window = nextWindow;
    prev = line;

    if (streak++ > 0) {
      process.stdout.clearLine(); // clear current text
      process.stdout.cursorTo(0); // move cursor to beginning of line
    }

    process.stdout.write('OK - ' + streak + 'x'); // write text
  }
});

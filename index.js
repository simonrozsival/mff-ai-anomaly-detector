import readline from 'readline';
import detect, { init } from './src';
import Plotly from 'plotly';

const rl = readline.createInterface({
  input: process.stdin
});

let window = null;
let prev = null;

const columns = [
  3,
  4,
  5,
  6,
  7,
  9,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25
];

// init plot
const plotly = Plotly('simonrozsival', '7Rg0jvVqWR9hvdQpSN42');
const plotToken = 'qdix2ztcm4';
const data = [...Array(columns.length + 1)].map(() => [
  {
    x: [],
    y: [],
    mode: 'lines+markers',
    stream: { token: plotToken, maxpoints: 1000 }
  }
]);
const graphOptions = { fileopt: 'new', filename: 'nodenodenode' };

const state = {
  anomaly: 'ANOMALY',
  ok: 'OK',
  skipping: 'LOADING ...'
};

let streak = 0;
let currently = state.skipping;
let lastChange = null;
let firstTimestamp = null;

/**
   * Visualise the current state of the detection.
   * @param {string} line The input from the sensors
   * @param {boolean} skipped If detection was skipped on the input
   * @param {boolean} anomalyDetected If an anomaly was detected
   */
const printState = (line, skipped, anomalyDetected) => {
  let nextState = skipped
    ? state.skipping
    : anomalyDetected ? state.anomaly : state.ok;

  let timestamp = Number(line.split(/\t/)[0]);

  if (firstTimestamp === null) {
    firstTimestamp = timestamp;
    lastChange = timestamp;
  }

  if (currently !== nextState) {
    process.stdout.write('\n');
    streak = 0;
    currently = nextState;
    lastChange = timestamp;
  }

  // print current status
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(
    `[${lastChange} :: ${(lastChange - firstTimestamp) / 1000}s] ${currently}`
  );

  if (lastChange !== null && currently !== state.anomaly) {
    process.stdout.write(
      ` - ${++streak}x [${(timestamp - lastChange) / 1000}s]`
    );
  }
};

let x = 0;

plotly.plot(data, graphOptions, () => {
  const stream = plotly.stream(plotToken, res => {
    console.log('stream open: ', res);
  });
  /**
   * Process another reading of the data
   */
  rl.on('line', line => {
    // init when the first line is read or after reset when an anomaly is detected
    if (window === null) {
      window = init(400);
      prev = line;
      return;
    }

    // process the current input
    const {
      skipped = false,
      anomalyDetected = false,
      window: nextWindow
    } = detect(prev, line, window, 0.6, columns);

    // write to the plot
    const lastItem = nextWindow.data[nextWindow.size - 1];
    const plotPoint = [
      ...lastItem.map(y => ({ x, y })),
      { x, y: anomalyDetected ? 1 : 0 }
    ];
    ++x;
    stream.write(JSON.stringify(plotPoint) + '\n');

    // if an anomaly is detected, then the process is reset
    if (anomalyDetected === true) {
      window = null;
    } else {
      window = nextWindow;
      prev = line;
    }

    printState(line, skipped, anomalyDetected);
  });
});

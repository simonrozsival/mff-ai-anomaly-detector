const fs = require('fs');
const byline = require('byline');

/**
 * Serialize the data from the CSV file to match the format the sensor readings
 * normally have when the data is received from the drone.
 * @param {Object} data
 * @returns {string} The serialized input from the sensors
 */
const serialize = (data) => {
  // the secret is that currently there is no difference between the input data and the output
  return data;
};

/**
 * Process the CSV with dummy data and output it to the STDOUT with the specific
 * delay to simulate the stream of data from the drone.
 * @param {string} fileName The name of the data file.
 */
const processDataFile = (fileName) => {

  try {
    let lastTimestamp = null;
    // read the csv file line-by-line and output all the data through a pipe
    const input =  fs.createReadStream(fileName);
    byline.createStream(input)
      .on('data', data => {
        const line = data.toString();
        // the first token of the line is the millisecond timestamp
        const [ timestamp ] = line.split(/\s+/, 1);
        if (lastTimestamp === null) {
          lastTimestamp = Number(timestamp); // there is no delay for the very first line
        }

        // wait to simulate the delayed data from the drone
        const delay = Number(timestamp) - lastTimestamp;
        const resumeAfter = Date.now() + delay * 20;

        // active waiting - the data has very high frequency
        while (Date.now() < resumeAfter) {}

        // now print it out!
        process.stdout.write(serialize(line + '\n'));

        // get ready for the next line
        lastTimestamp = Number(timestamp);
      });
  } catch (err) {
    console.error(`Error while reading file ${fileName}: ${err}`);
  }

};


// read the table with the input data
const fileName = process.argv.length > 2
  ? process.argv[2]
  : './mock-data/flight_auto01/navdata.tsv';

processDataFile(fileName);
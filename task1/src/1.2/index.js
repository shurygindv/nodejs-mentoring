import fs from 'fs';

import csv from 'csvtojson';

const logError = message => console.error(message);
const withErrorBoundary = emitter => emitter.on('error', logError);

const lowercaseHeader = (line, lineIndex) => {
    return lineIndex === 0 ? line.toLowerCase() : line;
};

const readableCsvStream = withErrorBoundary(fs.createReadStream(`${__dirname}/csv/input.csv`));
const writeableTxtStream = withErrorBoundary(fs.createWriteStream(`${__dirname}/csv/output.txt`));

const createCsvParser = () => csv({
    colParser: {
        amount: 'omit'
    },
    checkType: true
});

const setupCsvParser = () => createCsvParser()
    .fromStream(readableCsvStream)
    .preFileLine(lowercaseHeader)
    .pipe(writeableTxtStream);

withErrorBoundary(setupCsvParser());

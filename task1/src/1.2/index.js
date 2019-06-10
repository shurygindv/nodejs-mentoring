const csv = require('csvtojson');
const fs = require('fs');

const readableCsvStream = fs.createReadStream(`${__dirname}/csv/example.csv`);

const createCsvParser = () => csv({
    colParser:{
        "amount": "omit",
    },
    checkType: true,
});

const lowercaseHeader = (line, lineIndex) => {
    return lineIndex === 0 ? line.toLowerCase() : line;
};

const logJson = json => console.log(JSON.stringify(json));

createCsvParser()
    .on('error', console.error)
    .fromStream(readableCsvStream)
    .preFileLine(lowercaseHeader)
    .subscribe(logJson)
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const bigCities = [];

function parseBigCitiesList() {
    fs.createReadStream(path.resolve('./data/final500cities.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            // console.log(city);
            city = {
                City_ID: city.City_ID,
                City_Name: city.City_Name,
                State_ID: city.State_ID,
                State_Name: city.State_Name
            };
            bigCities.push(city);
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            console.log(bigCities.length);
            writeJSONToFile();
        });
}

function writeJSONToFile(){
    fs.writeFile('./final500CitiesLimited.csv', JSON.stringify(bigCities, null, 2), 'utf-8', (err) => {
        if (err) {
            console.log("error while writing file=" + err);
        } else {
            console.log("done");
        }
    })
}

parseBigCitiesList();
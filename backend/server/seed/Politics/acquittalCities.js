const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let allCities = []
let acqList = [];
let acqListMap = {};

function parseAcquittalList() {
    fs.createReadStream(path.resolve('./acquittal.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            acqCity = {
                cityName: city.city_name,
                stateID: city.state_id,
                acq: city.acquittal
            }
            acqList.push(acqCity);
            acqListMap[city.city_name + ":" + city.state_id] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            console.log(acqListMap);
            parseAllList();
        })
}

function parseAllList() {
    fs.createReadStream(path.resolve('./finalAllCitiesNew.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
                allCities.push(row)
        })
        .on('end', rowCount => {
            let city, state, filteredCity, acqVal;
            // console.log(allCities)
            allCities = allCities.map(dat => {
                city = dat.City_Name
                state = dat.State_ID
                filteredCity = acqListMap[city + ":" + state]
                acqVal = filteredCity ? filteredCity.acquittal : "None"
                return {
                    ...dat,
                    "Acquittal": acqVal
                }
            })
             console.log(allCities)
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred,RegisteredVoters,Beliefs,Insurance, Acquittal\n";

    allCities.forEach(city => {
        csvString += (Object.values(city).join(",") + "\n");
    })

    csvString = csvString.slice(0, -1);

    fs.writeFile('./finalAllCitiesNew.csv', csvString, 'utf-8', (err) => {
        if (err) {
            console.log("error while writing file=" + err);
        } else {
            console.log("done");
        }
    })
}

parseAcquittalList();
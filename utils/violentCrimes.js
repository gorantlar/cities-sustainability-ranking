const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let allCities = []
let crimeList = [];
let crimeListMap = {};

function parseViolentCrimesList() {
    fs.createReadStream(path.resolve('./violentcrimes.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            crimeCity = {
                cityName: city.CityName,
                stateID: city.StateID,
                ViolentCrimes: city.ViolentCrimes
            }
            crimeList.push(crimeCity);
            crimeListMap[city.CityName + ":" + city.StateID] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            //console.log(crimeListMap);
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
            let city, state, filteredCity, violentCrime;
            //console.log(allCities)
            allCities = allCities.map(dat => {
                city = dat.City_Name
                state = dat.State_ID
                filteredCity = crimeListMap[city + ":" + state]
                violentCrime = filteredCity ? filteredCity.ViolentCrimes : "None"
                return {
                    ...dat,
                    "ViolentCrimes": violentCrime
                }
            })
            // console.log(violentCrime)
            // console.log(allCities.slice(1,10))
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred,RegisteredVoters,ViolentCrimes\n";

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

parseViolentCrimesList();
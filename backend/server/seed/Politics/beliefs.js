const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let allCities = []
let beliefList = [];
let beliefListMap = {};

function parseBeliefsList() {
    fs.createReadStream(path.resolve('./beliefs.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            beliefCity = {
                cityName: city.CityName,
                stateID: city.StateID,
                beliefs: city.Beliefs
            }
            beliefList.push(beliefCity);
            beliefListMap[city.CityName + ":" + city.StateID] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            //console.log(beliefListMap);
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
            let city, state, filteredCity, beliefVal;
            // console.log(allCities)
            allCities = allCities.map(dat => {
                city = dat.City_Name
                state = dat.State_ID
                filteredCity = beliefListMap[city + ":" + state]
                beliefVal = filteredCity ? filteredCity.Beliefs : "None"
                return {
                    ...dat,
                    "Beliefs": beliefVal
                }
            })
             console.log(allCities)
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred,RegisteredVoters,Beliefs\n";

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

parseBeliefsList();
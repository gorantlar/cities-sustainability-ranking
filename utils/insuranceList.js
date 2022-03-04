const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let allCities = []
let insureList = [];
let insureListMap = {};

function parseInsuranceList() {
    fs.createReadStream(path.resolve('./uninsured.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            insureCity = {
                cityName: city.city_name,
                stateID: city.state_id,
                insurance: city.Uninsured
            }
            insureList.push(insureCity);
            insureListMap[city.city_name + ":" + city.state_id] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            //console.log(insureListMap);
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
            let city, state, filteredCity, insuranceVal;
            //console.log(allCities)
            allCities = allCities.map(dat => {
                city = dat.City_Name
                state = dat.State_ID
                filteredCity = insureListMap[city + ":" + state]
                insuranceVal = filteredCity ? filteredCity.Uninsured : "None"
                return {
                    ...dat,
                    "Insurance": insuranceVal
                }
            })
            //console.log(insuranceVal)
            //console.log(allCities.slice(1,10))
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred,RegisteredVoters,ViolentCrimes,Insurance\n";

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

parseInsuranceList();
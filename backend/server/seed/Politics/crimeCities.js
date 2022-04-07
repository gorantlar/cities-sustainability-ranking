const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

cities = [];
crimes = [];
flag =0;

function parseCrimeList() {
    fs.createReadStream(path.resolve('./crime.csv'), 'utf-8')
        .pipe(csv.parse({ headers: false }))
        .on('error', error => console.log(error))
        .on('data', row => {
                if (flag==0) {
                    cities = row.slice(1);
                    flag++;
                }
                else {
                    crimes = row.slice(1);
                }
                console.log(crimes);
        })
        .on('end', rowCount => {
            filterCitiesForCrime();
            console.log(`Parsed ${rowCount}`);
        });
}

function filterCitiesForCrime() {
    filteredCities = [];
    for (i =1; i<cities.length; i+=9) {
        location = cities[i].split("!!")[0];
        cityName = location.split(",")[0].trim();
        stateName = location.split(",")[1].trim();
        crimePercent = crimes[i];
        crime = {
            cityName : cityName,
            stateName : stateName,
            crimePercent : crimePercent
        }
        filteredCities.push(crime);
        //console.log(crime);
    }
    return filteredCities;
}

let allCitiesData = [];
function parseAllList() {
    fs.createReadStream(path.resolve('./finalAllCitiesNew.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
                allCitiesData.push(row)
        })
        .on('end', rowCount => {
            cities = filterCitiesForCrime();
            let city, state, crimeDat;
            allCitiesData = allCitiesData.map(dat => {
                city = dat.City_Name
                state = dat.State_Name
                crimeDat = cities.find(citi => citi.cityName === (city + " city") && citi.stateName === state)
                crimeDat = crimeDat ? crimeDat.crimePercent : "None"
                
                return {
                    ...dat,
                    "CrimesOccurred": crimeDat
                }
            })
            console.log(allCitiesData)
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred\n";

    allCitiesData.forEach(city => {
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

parseCrimeList();
parseAllList();
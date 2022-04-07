const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

cities = [];
populations = [];
flag =0;

function parsePovertyList() {
    fs.createReadStream(path.resolve('./Poverty.csv'), 'utf-8')
        .pipe(csv.parse({ headers: false }))
        .on('error', error => console.log(error))
        .on('data', row => {
                if (flag==0) {
                    cities = row.slice(1);
                    flag++;
                }
                else {
                    populations = row.slice(1);
                }

        })
        .on('end', rowCount => {
            filterCitiesAndPopulations();
            console.log(`Parsed ${rowCount}`);
        });
}

let allCitiesData = [];

function parseAllList() {
    fs.createReadStream(path.resolve('./finalAllCities.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
                allCitiesData.push(row)
        })
        .on('end', rowCount => {
            cities = filterCitiesAndPopulations();
            let city, state, pop;
            allCitiesData = allCitiesData.map(dat => {
                city = dat.City_Name
                state = dat.State_Name
                pop = cities.find(citi => citi.cityName === (city + " city") && citi.stateName === state)
                pop = pop ? pop.populationPercent : "None"
                
                return {
                    ...dat,
                    "PopulationPercent": pop
                }
            })
            console.log(allCitiesData)
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent\n";

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
parsePovertyList();
parseAllList();

function filterCitiesAndPopulations() {
    filteredCities = [];
    for (i =2; i<cities.length; i+=3) {
        location = cities[i].split("!!")[0];
        cityName = location.split(",")[0].trim();
        stateName = location.split(",")[1].trim();
        populationPercent = populations[i];
        poverty = {
            cityName : cityName,
            stateName : stateName,
            populationPercent : populationPercent
        }
        filteredCities.push(poverty);
    }
    return filteredCities;
}


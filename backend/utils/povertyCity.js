const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const cityRows = []
const allCitiesMap = {};
//let i =0;
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

            /*if(row.includes("Percent below poverty level")) {
                city_location = _.split(row.Location, ",");
                cityRow = {
                    city: city_location[0].trim(),
                    state: city_location[1].trim()
                };
                cityRows.push(cityRow);
            }*/
        })
        .on('end', rowCount => {
            filterCitiesAndPopulations();
            console.log(`Parsed ${rowCount}`);
            //console.log(cities);
            //console.log(populations);
            //cityRows.slice(0, 10).forEach(cityRow => console.log(cityRow));
            //parseAllCitiesList();
        });
}

let allCitiesData = [];

function parseAllList() {
    fs.createReadStream(path.resolve('./finalAllCities.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
                allCitiesData.push(row)

            /*if(row.includes("Percent below poverty level")) {
                city_location = _.split(row.Location, ",");
                cityRow = {
                    city: city_location[0].trim(),
                    state: city_location[1].trim()
                };
                cityRows.push(cityRow);
            }*/
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
            //console.log(cities);
            //console.log(populations);
            //cityRows.slice(0, 10).forEach(cityRow => console.log(cityRow));
            //parseAllCitiesList();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent\n";

    allCitiesData.forEach(city => {
        csvString += (Object.values(city).join(",") + "\n");
    })

    csvString = csvString.slice(0, -1);
    // console.log("csvString\n\n"+csvString);

    fs.writeFile('./finalAllCitiesNew.csv', csvString, 'utf-8', (err) => {
        if (err) {
            console.log("error while writing file=" + err);
        } else {
            console.log("done");
        }
    })
}

// {
//     City_ID: '1840075310',
//     City_Name: 'Doney Park',
//     State_Name: 'Arizona',
//     State_ID: 'AZ',
//     County_Name: 'Coconino',
//     County_FIPS: '4005',
//     Latitude: '35.2687',
//     Longitude: '-111.5053',
//     Population_August_13_2021: '5021',
//     Density_August_13_2021: '129',
//     Zips: '86004',
//     '': ''
//   }

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


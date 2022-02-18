const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const cityRows = []
const allCitiesMap = {};

function parseHousingList() {
    fs.createReadStream(path.resolve('./houseLists.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
            //console.log(row);
            if(row.Total){
                city_location = _.split(row.Location, ",");
                cityRow = {
                    city: city_location[0].trim(),
                    state: city_location[1].trim(),
                    total: row.Total.split(",").join(""),
                    occupied: row.Occupied.split(",").join(""),
                    vacant: row.Vacant.split(",").join("")
                };
                cityRows.push(cityRow);
            }
            //bigCities.push(city);
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            cityRows.slice(0, 50).forEach(cityRow => console.log(cityRow));
            parseAllCitiesList();
        });
}
parseHousingList();

function parseAllCitiesList() {
    fs.createReadStream(path.resolve('./houseLists.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            city = {
                City_Name: city.city_name,
                State_Name: city.state_name,
                Total: city.total,
                Occupied: city.occupied,
                Vacant: city.vacant
            };
            // allCities.push(city);
            allCitiesMap[city.state_name + ":" + city.city_name] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            //filterCitiesAndWriteToFile();
        })
}
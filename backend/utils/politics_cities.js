const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let allCities = []
let houseList = [];
let houseListMap = {};

// function parseHousingList() {
//     fs.createReadStream(path.resolve('./houseLists.csv'), 'utf-8')
//         .pipe(csv.parse({ headers: true }))
//         .on('error', error => console.log(error))
//         .on('data', row => {
//             //console.log(row);
//             if(row.Total){
//                 city_location = _.split(row.Location, ",");
//                 cityRow = {
//                     city: city_location[0].trim(),
//                     state: city_location[1].trim(),
//                     total: row.Total.split(",").join(""),
//                     occupied: row.Occupied.split(",").join(""),
//                     vacant: row.Vacant.split(",").join("")
//                 };
//                 cityRows.push(cityRow);
//             }
//             //bigCities.push(city);
//         })
//         .on('end', rowCount => {
//             console.log(`Parsed ${rowCount}`);
//             // cityRows.slice(0, 10).forEach(cityRow => console.log(cityRow));
//             parseAllCitiesList();
//         });
// }
// parseHousingList();

function parseHousingList() {
    fs.createReadStream(path.resolve('./houseLists.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            const location = city.Location.trim().split(", ")
            city = {
                City_Name: getCityName(location[0]),
                State_Name: location[1],
                Total: parseInt(city.Total.split(",").join("")),
                Occupied: parseInt(city.Occupied.split(",").join("")),
                Vacant: parseInt(city.Vacant.split(",").join(""))
            };
            houseList.push(city);
            houseListMap[getCityName(location[0]) + ":" + location[1]] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            parseAllList()
            //filterCitiesAndWriteToFile();
        })
}

parseHousingList();

function getCityName(city){
    let arr = city.split(" ")
    arr.pop()
    arr = arr.join(" ")
    return arr
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses\n";

    allCities.forEach(city => {
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

function parseAllList() {
    fs.createReadStream(path.resolve('./finalAllCitiesNew.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => {
                allCities.push(row)

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
            let city, state, filteredCity, houses;
            console.log(allCities)
            allCities = allCities.map(dat => {
                city = dat.City_Name
                state = dat.State_Name
                filteredCity = houseListMap[city + ":" + state]
                houses = filteredCity ? filteredCity.Vacant / filteredCity.Total : "None"
                return {
                    ...dat,
                    "Vacant_houses": houses
                }
            })
            console.log(allCities)
            writeToFile();
        });
}



const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

cities = [];
voters = [];
flag =0;

function parseVoterList() {
    fs.createReadStream(path.resolve('./registeredvoters.csv'), 'utf-8')
        .pipe(csv.parse({ headers: false }))
        .on('error', error => console.log(error))
        .on('data', row => {
                if (flag==0) {
                    cities = row.slice(1);
                    flag++;
                }
                else if(flag==3){
                    voters = row.slice(1);
                    flag++;
                }
                else {
                    flag++;
                }
                //console.log(cities);
        })
        .on('end', rowCount => {
            filterCitiesForVoters();
            console.log(`Parsed ${rowCount}`);
        });
}

function filterCitiesForVoters() {
    filteredCities = [];
    for (i =1; i<cities.length; i+=2) {
        location = cities[i].split("!!")[0];
        cityName = location.split(",")[0].trim();
        stateName = location.split(",")[1].trim();
        votersPercent = voters[i];
        voter = {
            cityName : cityName,
            stateName : stateName,
            votersPercent : votersPercent
        }
        filteredCities.push(voter);
        //console.log(voter);
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
            cities = filterCitiesForVoters();
            let city, state, votersDat;
            allCitiesData = allCitiesData.map(dat => {
                city = dat.City_Name
                state = dat.State_Name
                votersDat = cities.find(citi => citi.cityName === (city + " city") && citi.stateName === state)
                votersDat = votersDat ? votersDat.votersPercent : "None"
                
                return {
                    ...dat,
                    "RegisteredVoters": votersDat
                }
            })
            //console.log(allCitiesData)
            writeToFile();
        });
}

function writeToFile(){
    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips,,PoplutionPercent,Vacant_houses,CrimesOccurred,RegisteredVoters\n";
    console.log("1")
    allCitiesData.forEach(city => {
        csvString += (Object.values(city).join(",") + "\n");
    })
    console.log("2")
    csvString = csvString.slice(0, -1);
    console.log("3")
    fs.writeFile('./finalAllCitiesNew.csv', csvString, 'utf-8', (err) => {
        if (err) {
            console.log("error while writing file=" + err);
        } else {
            console.log("done");
        }
    })
}

parseVoterList();
parseAllList();
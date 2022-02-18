const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const bigCities = [];
const allCitiesMap = {};
let finalCities = [];

function parseBigCitiesList() {
    fs.createReadStream(path.resolve('./data/500cities.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            bigCities.push(city);
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            parseAllCitiesList();
        });
}

function parseAllCitiesList() {
    fs.createReadStream(path.resolve('./data/uscities.csv'), 'utf-8')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', city => {
            city = {
                city_id: city.id,
                city_name: city.city_ascii,
                state_name: city.state_name,
                state_id: city.state_id,
                county_name: city.county_name,
                county_fips: city.county_fips,
                latitude: city.lat,
                longitude: city.lng,
                population_August_13_2021: city.population,
                density_August_13_2021: city.density,
                zips: city.zips
            };
            // allCities.push(city);
            allCitiesMap[city.state_name + ":" + city.city_name] = city;
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount}`);
            filterCitiesAndWriteToFile();
        })
}

function filterCitiesAndWriteToFile() {
    count = 0;
    bigCities.forEach(city => {
        const key = city.State + ":" + city.City;
        if (allCitiesMap[key]) {
            finalCities.push(allCitiesMap[key]);
            count++;
        } else {
            const closestKeys = findClosestCityKeys(key);
            console.log("No city found for key=" + key + ", closestKeys=[" + closestKeys + "]");

            if (closestKeys.length == 0 && key.includes('Hawaii:City and County of Honolulu')) {
                // Honolulu	Honolulu	HI	Hawaii	15003	Honolulu	21.3294	-157.846	820987	2200	polygon	FALSE	TRUE	Pacific/Honolulu	2	96859 96850 96822 96826 96813 96815 96814 96817 96816 96819 96818 96801 96802 96803 96804 96805 96806 96807 96808 96809 96810 96811 96812 96820 96823 96828 96830 96836 96837 96838 96839 96840 96841 96843 96844 96846 96847 96848 96849 96858 96898	1840013305
                hawaii = allCitiesMap["Hawaii:Honolulu"];
                console.log("hawaii=" + JSON.stringify(hawaii, null, 2));
                finalCities.push(hawaii);
                count++;

            } else if (closestKeys.length == 1) {
                closestCity = allCitiesMap[closestKeys[0]];
                console.log("closestCity=" + JSON.stringify(closestCity, null, 2));
                finalCities.push(closestCity);
                count++;

            } else {
                console.log("wtf");

            }
        }
    });

    finalCities = _.sortBy(finalCities, [city => { return -1*parseInt(city['population_August_13_2021']) }]);

    console.log("total matched and inserted=" + count + ", writing to file");

    csvString = "City_ID,City_Name,State_Name,State_ID,County_Name,County_FIPS,Latitude,Longitude,Population_August_13_2021,Density_August_13_2021,Zips\n";

    finalCities.forEach(city => {
        csvString += (Object.values(city).join(",") + "\n");
    })

    csvString = csvString.slice(0, -1);
    // console.log("csvString\n\n"+csvString);

    fs.writeFile('./final500Cities.csv', csvString, 'utf-8', (err) => {
        if (err) {
            console.log("error while writing file=" + err);
        } else {
            console.log("done");
        }
    })
}

function findClosestCityKeys(target) {
    const closestKeys = [];
    Object.keys(allCitiesMap).forEach(key => {
        if (key.includes(target) || target.includes(key)) {
            closestKeys.push(key);
        }
    })
    return closestKeys;
}

parseBigCitiesList();
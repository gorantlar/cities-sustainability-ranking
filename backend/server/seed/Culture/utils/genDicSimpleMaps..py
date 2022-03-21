# This code reads uscities.xlsx and generate a new csv with filtered format and half of the most populated cities per state
import pandas as pd

df = pd.read_excel('uscities.xlsx', sheet_name="Sheet1")
print(df.columns)
# key: city:county:state_code
# value: id, state, county, city, latitude, longitude, population, density
size = len(df)
cities = df["city"].values
state_names = df["state_name"].values
state_ids = df["state_id"].values
counties = df["county_name"].values
latitudes = df["lat"].values
longitudes = df["lng"].values
populations = df["population"]
densities = df["density"]
cityMap = {}

values = {}

for i in range(size):
    state = state_names[i]
    key = cities[i]+":"+counties[i]+":"+state_ids[i]
    value = [
        state_names[i], state_ids[i], counties[i], cities[i],
        latitudes[i], longitudes[i],
        populations[i], densities[i]
    ]

    if(state in values):
        values[state].append([key] + value)
    else:
        values[state] = [[key] + value]

buffer = []
for state in values.keys():
    citiesList = values[state]
    # sort on population
    citiesList.sort(key= lambda x: x[len(x)-2], reverse = True)
    # toCheck = len(citiesList)//2
    # if(toCheck+1<len(citiesList)):
    #     print(state, ": ",len(citiesList), ":",citiesList[toCheck + 1])
    # else:
    #     print(state,"---------------------------")
    for i in range(len(citiesList)//2):
        cityDetails = [citiesList[i][0]]
        for val in citiesList[i][1:]:
            cityDetails.append(val)
        buffer.append(cityDetails)

# sort on city names
buffer.sort(key = lambda x: x[4])

file = open("cityMap3.csv", "w")
for row in buffer:
    rowJoined = ""
    for val in row:
        rowJoined += str(val) + ","
    file.write(rowJoined[:-1]+"\n")

# file.close()
from neo4j import GraphDatabase
from backend.server.entities import City

import csv

uri             = "bolt://localhost:7687"
userName        = "neo4j"
password        = "test"

all_cities = []

with open('../../data/final500Cities.csv') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        all_cities.append(City(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]))

    for city in all_cities:
        print(city)
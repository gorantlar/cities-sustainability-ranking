import csv
import json
import sys

from fastapi import FastAPI
from neo4j import GraphDatabase

from server.controllers import CityController, DomainController
from server.models.City import City
from server.models.domains.Culture import Culture
from server.resources import helper

app = FastAPI()

uri = "bolt://localhost:7687"
userName = "neo4j"
password = "test"

graphDB_Driver = GraphDatabase.driver(uri, auth=(userName, password))
db_session = graphDB_Driver.session()


@app.get("/index/{city_name}/{state_id}")
async def root(city_name, state_id):
    response = CityController.get_sustainability_index(city_name, state_id, db_session)
    return {
        "response": response
    }


@app.get("/seed/{secret_key}")
async def seed():
    print("attempt to seed")
    # config = helper.get_config()
    # print(config)

    min_max = {}

    # read the file, parse city objects
    with open('./server/seed/final500Cities.csv') as csvfile:
        cities = [{k: str(v) for k, v in row.items()}
                  for row in csv.DictReader(csvfile, skipinitialspace=True)]

        print(cities[0])

        for city in cities:
            city_obj = City(city)
            # pass them to create or insert cities in controller(It should read and update the config as well)
            node, info = db_session.write_transaction(CityController.merge_city_tx, city_obj)
            for var in vars(city_obj):
                float_value = helper.get_float(getattr(city_obj, var))
                if var not in min_max:
                    min_max[var] = [sys.float_info.max, sys.float_info.min]
                    # print(min_max[var])
                min_max[var][0] = min(float_value, min_max[var][0])
                min_max[var][1] = max(float_value, min_max[var][1])

        print(min_max)
        helper.write_config(min_max)
        return {
            "count": len(cities),
            "min_max": json.dumps(min_max, indent=2)
        }




@app.get("/recalculate/{secret_key}")
async def recalculate():
    print("starting to recalculate")
    config = helper.get_config()
    cql = CityController.__get_index_statement()
    city_nodes = db_session.run(cql)

    for city_node in city_nodes:
        city = City(city_node['a'])
        # print(getattr(city, 'name'))
        culture = Culture(city, config)
        node, info = db_session.write_transaction(DomainController.merge_domain_tx, city, culture)
        #for each subdomain of culture, repeat

        # economics = Economics(city, config)
        # ecology = Ecology(city, config)
        # politics = Politics(city, config)

    return {
        "count": len(city_nodes)
    }

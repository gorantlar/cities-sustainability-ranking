import csv
import json

from fastapi import FastAPI
from neo4j import GraphDatabase
from pydantic import BaseModel
from pydantic.class_validators import Optional

from server.controllers import CityController
from server.models.City import City
from server.resources import helper

app = FastAPI()

uri = "bolt://localhost:7687"
userName = "neo4j"
password = "test"

graphDB_Driver = GraphDatabase.driver(uri, auth=(userName, password))
db_session = graphDB_Driver.session()


class Filter(BaseModel):
    name: Optional[str] = None
    state: Optional[str] = None
    state_id: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None


@app.post("/index/{page}/{limit}")
async def get_cities(page: int, limit: int, city_filter: Filter):
    # print(city_filter.dict())
    response = CityController.get_all_cities(db_session, page, limit, city_filter.dict())
    return {
        "cities": response
    }


@app.get("/city_by_name_state_id/{city_name}/{state_id}")
async def root(city_name, state_id):
    response = CityController.get_sustainability_index(city_name, state_id, db_session)
    return {
        "response": response
    }


@app.get("/citydetails/{city_id}")
async def getcitydetails(city_id):
    config = helper.get_config()
    city = CityController.get_city_details(city_id, config, db_session)
    return city


@app.get("/seed/{secret_key}")
async def seed():
    print("attempt to seed")

    min_max = {}

    # read the file, parse city objects
    with open('./server/seed/final500Cities.csv', mode='r', encoding='utf-8-sig') as csvfile:
        cities = [{k: str(v) for k, v in row.items()}
                  for row in csv.DictReader(csvfile, skipinitialspace=True)]

        print(cities[0])

        for city_dict in cities:
            node, info = db_session.write_transaction(CityController.merge_city_tx, city_dict)
            for key in city_dict:
                float_value = helper.get_float(city_dict[key])
                if float_value == -1:
                    continue
                if key not in min_max:
                    min_max[key] = [float_value, float_value]
                else:
                    min_max[key][0] = min(float_value, min_max[key][0])
                    min_max[key][1] = max(float_value, min_max[key][1])

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
    cities = []
    count = 0

    for city_node in city_nodes:
        city = City(city_node['a'], config)
        cities.append(city)
        CityController.update_city_score(city, db_session)
        count += 1
        print(count)

    # calculate and store the rank of each city in the city node(smaller value means higher rank)
    city_rank = count
    cities.sort(key=lambda x: x.score)
    for city in cities:
        print(city.name, city.state, city.score, city_rank)
        city.rank = city_rank
        city_rank -=1
        CityController.update_city_rank(city, db_session)

    return {
        "count": len(cities)
    }

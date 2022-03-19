from fastapi import FastAPI
from neo4j import GraphDatabase
from server.controllers import CityController

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

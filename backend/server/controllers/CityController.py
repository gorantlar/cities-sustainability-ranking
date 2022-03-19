# Create City
import re


def create_city_tx(tx, city):
    statement = __get_create_statement(city)
    result = tx.run(statement)
    record = result.single()
    value = record.value()
    info = result.consume()
    return value, info
    # print(f'executing {statement}')
    # result = db_session.run(statement)
    # print(f'results {result}')
    # return result


'''
def create_cities_tx(tx, cities):
    create_statements = []
    for city in cities:
        create_statement = __get_create_bulk_statement(city)
        create_statements.append(create_statement)

    create_bulk_statement = "CREATE " + ", ".join(create_statements)
    print(create_bulk_statement)
    results = tx.run(create_bulk_statement)
    # record = result.single()
    # value = record.value()
    # info = result.consume()
    return results
'''


def find_city(city, db_session):
    statement = __get_find_statement(city)
    print(f'executing {statement}')
    result = db_session.run(statement)
    print(f'results {result}')
    return result


def update_city(city, db_session):
    statement = __get__update_statement(city.city_id, city)
    print(f'executing {statement}')
    result = db_session.run(statement)
    print(f'results {result}')
    return result


def delete_city(city, db_session):
    statement = __get_delete_statement(city)
    print(f'executing {statement}')
    result = db_session.run(statement)
    print(f'results {result}')
    return result


# Helper functions
def __get_create_statement(city):
    return 'CREATE (a:City {city_id : "'+city.city_id+'", name : "'+city.name+'", state : "'+city.state+'", state_id : "'+city.state_id+'", county : "'+city.county+'", county_fips : "'+city.county_fips+'", latitude : '+city.latitude+', longitude : '+city.longitude+', population : '+city.population+', density : '+city.density+', zips : "'+city.zips+'" }) RETURN a'


# def __get_create_bulk_statement(city):
#     return f"({city.name+city.city_id}:City {{city_id : {city.city_id}, name : '{city.name}', state : '{city.state}', state_id : '{city.state_id}', county : '{city.county}', county_fips : {city.county_fips}, latitude : {city.latitude}, longitude : {city.longitude}, population : {city.population}, density : {city.density}, zips : '{city.zips}' }})"


def __get_find_statement(city):
    return f"MATCH (a:City {{city_id: {city.city_id}}}) RETURN a"


def __get_delete_statement(city):
    return f"MATCH (a:City {{city_id: {city.city_id} }}) DELETE a"


def __get__update_statement(city_id, details):
    if len(details) == 0: raise ValueError("Details cannot be empty")

    retVal = f"MATCH (a:City {{city_id : {city_id}}}) SET "
    for key, val in details.items():
        if key == "city_id":
            continue
        retVal += f"a.{key} = {val}"

    return retVal + " RETURN a"

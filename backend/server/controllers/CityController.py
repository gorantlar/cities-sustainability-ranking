from server.entities.City import City

# Create City
def get_sustainability_index(city_name, state_id, db_session):
    node, info = db_session.write_transaction(find_city_by_name_and_state_id, city_name, state_id)
    city = City.get_city(node)
    print(city)
    return {
        "city": city,
        "index": 90
    }


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


def find_city_by_id(city, db_session):
    statement = __get_find_by_city_id_statement(city)
    print(f'executing {statement}')
    result = db_session.run(statement)
    print(f'results {result}')
    return result


def find_city_by_name_and_state_id(tx, city_name, state_id):
    statement = __get_find_by_cityname_and_state_id_statement(city_name, state_id)
    print(f'executing {statement}')
    result = tx.run(statement)
    print(f'results {result}')
    record = result.single()
    value = record.value()
    info = result.consume()
    return value, info


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
    return 'CREATE (a:City {city_id : "' + city.city_id + '", name : "' + city.name + '", state : "' + city.state + '", state_id : "' + city.state_id + '", county : "' + city.county + '", county_fips : "' + city.county_fips + '", latitude : ' + city.latitude + ', longitude : ' + city.longitude + ', population : ' + city.population + ', density : ' + city.density + ', zips : "' + city.zips + '" }) RETURN a'


# def __get_create_bulk_statement(city):
#     return f"({city.name+city.city_id}:City {{city_id : {city.city_id}, name : '{city.name}', state : '{city.state}', state_id : '{city.state_id}', county : '{city.county}', county_fips : {city.county_fips}, latitude : {city.latitude}, longitude : {city.longitude}, population : {city.population}, density : {city.density}, zips : '{city.zips}' }})"


def __get_find_by_city_id_statement(city_id):
    return f"MATCH (a:City {{city_id: {city_id}}}) RETURN a"


def __get_find_by_cityname_and_state_id_statement(city_name, state_id):
    return 'MATCH (a:City {name: "' + city_name + '", state_id: "' + state_id + '"}) RETURN a'


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

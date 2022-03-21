import csv

from server.controllers import CityController
from server.entities.City import City
from server.entities.State import State


def read_cities_and_states():
    with open('final500Cities.csv') as csvfile:
        spam_reader = csv.reader(csvfile, delimiter=',')
        all_cities = set()
        all_states = set()
        first = True

        for row in spam_reader:
            if first:
                first = False
                continue

            city = City(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10],
                        row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19], row[20],
                        row[21], row[22], row[23], row[24], row[25], row[26], row[27], row[28], row[29], row[30],
                        row[31])
            state = State(city)
            all_cities.add(city)
            all_states.add(state)

        print(len(all_cities))
        print(len(all_states))
        # for city in all_cities:
        #     print(city)

        # for state in all_states:
        #     print(state)

        return (all_cities, all_states)


def insert_cities_and_states(cities, states, db_session):
    for city in cities:
        node, info = db_session.write_transaction(CityController.create_city_tx, city)
        city2 = City.get_city(node)
        print(city2)


# if __name__ == '__main__':
#     tup = read_cities_and_states()
#     insert_cities_and_states(tup[0], tup[1], )

'''
module_name, package_name, ClassName, method_name, ExceptionName, function_name, GLOBAL_CONSTANT_NAME, global_var_name, instance_var_name, function_parameter_name, local_var_name.
'''

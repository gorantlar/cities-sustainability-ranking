import neo4j
from neo4j import graph


class City:
    def __init__(self, city_id, name, state, state_id, county, county_fips, latitude, longitude, population, density,
                 zips):
        self.city_id = city_id
        self.name = name
        self.state = state
        self.state_id = state_id
        self.county = county
        self.county_fips = county_fips
        self.latitude = latitude
        self.longitude = longitude
        self.population = population
        self.density = density
        self.zips = zips

    def get_city(self, node):
        if not isinstance(node, neo4j.graph.Node):
            raise TypeError("Argument passed is not a neo4j.graph.Node")

        retVal = City(
            node['city_id'],
            node['name'],
            node['state'],
            node['state_id'],
            node['county'],
            node['county_fips'],
            node['latitude'],
            node['longitude'],
            node['population'],
            node['density'],
            node['zips']
        )

        return retVal

    def __hash__(self):
        return hash(self.city_id)

    def __eq__(self, other):
        """checking equality"""
        if isinstance(other, self.__class__):
            return self.__hash__() == other.__hash__()
        return NotImplemented

    def __ne__(self, other):
        """checking inequality"""
        if isinstance(other, self.__class__):
            return not self.__eq__(other)
        return NotImplemented

    def __str__(self) -> str:
        return str(self.city_id) + ", " + self.name + ", " + self.state_id

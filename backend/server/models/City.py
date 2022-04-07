import neo4j
from neo4j import graph
from server.resources.helper import getDomains, get_value
from server.models.domains.Economics import Economics
from server.models.domains.Culture import Culture
from server.models.domains.Ecology import Ecology


class City:
    def __init__(self, city_dict):
        for key in city_dict:
            self.__setattr__(key, get_value((city_dict[key])))

        self.score = self.calculate_score()


    @staticmethod
    def get_city(node):
        if not isinstance(node, neo4j.graph.Node):
            raise TypeError("Argument passed is not a neo4j.graph.Node")

    def calculate_score(self):
        domains_config = getDomains()
        numer = 0
        denom = 0
        for domain, domain_info in domains_config.items():
            # passing subdomain dictionary to the constructors of domains
            self.__setattr__(domain, globals()[domain](self, domain_info["subdomains"]))
            weight = domain_info["weight"]

            temp = self.__getattribute__(domain).score
            print(domain, temp)
            numer += (weight * temp)
            denom += weight

        if not denom:
            print(f'Divide by 0: in City:calculate_score for {self.city.city_id}')
            return 0

        return format(numer/denom, ".2f")

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
        attrs = [a for a in dir(self) if not a.startswith('__') and not callable(getattr(self, a))]
        retval = '{'
        for attr in attrs:
            retval += (attr + ":" + str(self.__getattribute__(attr)) + ", ")
        retval += '}'
        return retval
        # return str(self.city_id) + ", " + self.name + ", " + self.state_id

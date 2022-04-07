from server.models.City import City

class State:
    def __init__(self, city):
        if not isinstance(city, City):
            raise TypeError("Argument passed is not a city")

        self.state_id = city.state_id
        self.name = city.state
        self.county = city.county
        self.county_fips = city.county_fips

    def __hash__(self):
        return hash(self.state_id)

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
        return self.state_id + ", " + self.name


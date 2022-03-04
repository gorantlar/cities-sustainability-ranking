class City:
    def __init__(self, city_id, name, state, state_id, county, county_fips, latitude, longitude, population, density, zips):
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

    def __str__(self) -> str:
        return self.name + ", " + self.state_id


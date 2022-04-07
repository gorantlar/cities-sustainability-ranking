from entities.City import City
from entities.SubdomainUtils import SubdomainUtils

class ConsumptionAndUse(SubdomainUtils):
    def __init__(self, city: City):
        super(ConsumptionAndUse, self).__init__(city, "economics", "consumption and use")
        self.columns_and_normalized = [
                    ["government_finances_expenditure_per_resident_in_2018", 0],
                    ["government_finances_revenue_per_resident_in_2018", 0],
                    ["government_finances_debt_per_resident_in_2018", 0],
                    ["government_finances_cash_and_securities_per_resident_in_2018", 0]]

# test1 = City('New York', 'name', 'state', 'state_id', 'county', 'county_fips', 'latitude', 'longitude',
#              'population','density', 'zips', 'speak_a_language_other_than_english', 16064.04, 13612.87, 37441.2, 5324.48)
# s = ConsumptionAndUse(test1).get_subdomain_score()
# print(s)
#
# test1 = City('Austin', 'name', 'state', 'state_id', 'county', 'county_fips', 'latitude', 'longitude',
#              'population','density', 'zips', 'speak_a_language_other_than_english', 4469.71, 3837.05, 11021.46, 2552.31)
# s = ConsumptionAndUse(test1).get_subdomain_score()
# print(s)
#
# test1 = City('Phoenix', 'name', 'state', 'state_id', 'county', 'county_fips', 'latitude', 'longitude',
#              'population','density', 'zips', 'speak_a_language_other_than_english', 1932.48, 2320.59, 10558.39, 2932.33)
# s = ConsumptionAndUse(test1).get_subdomain_score()
# print(s)

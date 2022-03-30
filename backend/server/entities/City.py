import neo4j
from neo4j import graph

class City:
    def __init__(self, city_id, name, state, state_id, county, county_fips, latitude, longitude, population, density,
                 zips, speak_a_language_other_than_english,
                 government_finances_expenditure_per_resident_in_2018 , government_finances_revenue_per_resident_in_2018 ,
                 government_finances_debt_per_resident_in_2018 , government_finances_cash_and_securities_per_resident_in_2018):
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
        self.speak_a_language_other_than_english = speak_a_language_other_than_english
        # self.bachelors_degree_or_higher = bachelors_degree_or_higher
        # self.two_or_more_races = two_or_more_races
        # self.park_access = park_access
        # self.walkability = walkability
        # self.limited_access_to_healthy_foods = limited_access_to_healthy_foods
        # self.foreign_born = foreign_born
        # self.state_annual_co2_equivalent_total_output_emission_rate_lb_mwh_2020 = state_annual_co2_equivalent_total_output_emission_rate_lb_mwh_2020
        # self.state_annual_total_nonrenewables_net_generation_mwh_2020 = state_annual_total_nonrenewables_net_generation_mwh_2020
        # self.state_annual_total_renewables_net_generation_mwh_2020 = state_annual_total_renewables_net_generation_mwh_2020
        # self.frequent_physical_distress_in_2018_percent = frequent_physical_distress_in_2018_percent
        # self.broadband_connection_2019 = broadband_connection_2019
        # self.park_access_2018 = park_access_2018
        # self.preventive_services_2018 = preventive_services_2018
        # self.walkability_2019 = walkability_2019
        # self.poplution_percent = poplution_percent
        # self.vacant_houses = vacant_houses
        # self.crimes_occurred = crimes_occurred
        # self.registered_voters = registered_voters
        # self.violent_crimes = violent_crimes
        # self.insurance = insurance

        self.government_finances_expenditure_per_resident_in_2018 = government_finances_expenditure_per_resident_in_2018
        self.government_finances_revenue_per_resident_in_2018 = government_finances_revenue_per_resident_in_2018
        self.government_finances_debt_per_resident_in_2018 = government_finances_debt_per_resident_in_2018
        self.government_finances_cash_and_securities_per_resident_in_2018 = government_finances_cash_and_securities_per_resident_in_2018


    @staticmethod
    def get_city(node):
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
            node['zips'],
            node['speak_a_language_other_than_english'],
            # node['bachelors_degree_or_higher']
            # node['two_or_more_races'],
            # node['park_access'],
            # node['walkability'],
            # node['limited_access_to_healthy_foods'],
            # node['foreign_born'],
            # node['state_annual_c_o_2_equivalent_total_output_emission_rate_lb_m_wh_2020'],
            # node['state_annual_total_nonrenewables_net_generation_m_wh_2020'],
            # node['state_annual_total_renewables_net_generation_m_wh_2020'],
            # node['frequent_physical_distress_in_2018_percent'],
            # node['broadband_connection_2019'],
            # node['park_access_2018'],
            # node['preventive_services_2018'],
            # node['walkability_2019'],
            # node['poplution_percent'],
            # node['vacant_houses'],
            # node['crimes_occurred'],
            # node['registered_voters'],
            # node['violent_crimes'],
            # node['insurance'],
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

from entities.NormalizationHelper import NormalizationHelper
from entities.City import City
from resources.config import get_config

class SubdomainUtils(object):
    def __init__(self, city: City, domain: str, subdomain: str):
        self.cols_min_max = NormalizationHelper.get_instance().get_cols_min_max()
        self.domain = domain
        self.subdomain = subdomain
        self.subdomain_col_weights = get_config()["weights"]\
                                        [domain]["subdomains"]\
                                        [subdomain]["columns"]

        self.columns_and_normalized = []
        self.city = city

    def update_normalized_values(self):

        for i in range(len(self.columns_and_normalized)):
            col_name = self.columns_and_normalized[i]
            self.columns_and_normalized[i][1] = self.get_normalized_value(col_name,
                                                                          getattr(self.city, col_name))

    def get_normalized_value(self, col_name, val):
        if col_name not in self.cols_min_max:
            print(f"{col_name} not present in cols_min_max")

        mini = self.cols_min_max[col_name][0]
        maxi = self.cols_min_max[col_name][1]

        return ((val - mini) / (maxi - mini)) * 100

    def get_subdomain_score(self):
        numer = 0
        denom = 0

        for i in range(len(self.columns_and_normalized)):
            col_name = self.columns_and_normalized[i][0]
            wt = self.subdomain_col_weights[col_name]

            numer += (self.get_normalized_value(col_name,
                                                getattr(self.city, col_name) * wt))
            denom += wt

        if not denom:
            print(f'Divide by 0: in get_subdomain_score for {self.city.city_id}')

        return format(numer/denom, ".2f")



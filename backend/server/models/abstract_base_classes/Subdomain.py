import json
from abc import ABC, abstractmethod
from server.resources import helper


class Subdomain(ABC):

    @abstractmethod
    def __init__(self, city, config):
        self.breakdown = {}
        self.score = self.calculate_score(city, config)

    @staticmethod
    def get_breakdown_json(subdomain):
        return json.dumps(json.dumps(subdomain.breakdown))[1:-1]

    @abstractmethod
    def calculate_score(self, city, columns_info):
        numer = 0
        denom = 0

        for col, col_info in columns_info.items():
            float_value = helper.get_float(city.__getattribute__(col))
            if float_value == -1:
                float_value = col_info["min"] #default a column value to the minimum if not found

            self.breakdown[col] = self.get_normalized(float_value, col_info)
            weight = col_info["weight"]
            temp = self.breakdown[col]
            # print("\t", col, temp)
            numer += (weight * temp)
            denom += weight

        if not denom:
            print(f'Divide by 0: in Domain:calculate_score for {self.city_id}')
            return 0

        return float(format(numer / denom, ".2f"))

    def get_normalized(self, value, info):
        mini = info["min"]
        maxi = info["max"]
        inverse = info["inverse"]

        if inverse:
            return (mini + (1 - ((value - mini) / (maxi - mini)))) * 100
        return ((value - mini) / (maxi - mini)) * 100

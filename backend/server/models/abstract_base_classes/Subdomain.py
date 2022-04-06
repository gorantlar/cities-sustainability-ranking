import json
from abc import ABC, abstractmethod


# class Subdomain(ABC):
class Subdomain:
    # @staticmethod
    # @property
    # @abstractmethod
    # def label(self):
    #     pass

    @property
    # @abstractmethod
    def breakdown(self):
        return self.__breakdown

    @property
    # @abstractmethod
    def score(self):
        return self.__score

    def __init__(self, city, config):
        self.__breakdown = {}
        self.__score = self.calculate_score(self, city, config)


    @staticmethod
    def get_breakdown_json(subdomain):
        return json.dumps(subdomain.__breakdown)

    @staticmethod
    def calculate_score(self, city, columns_info):
        numer = 0
        denom = 0
        for col, col_info in columns_info.items():
            # print(col, col_info)
            self.__breakdown[col] = self.get_normalized(city.__getattribute__(col), col_info)
            weight = col_info["weight"]
            temp = self.breakdown[col]
            # print("\t", col, temp)
            numer += (weight * temp)
            denom += weight

        if not denom:
            print(f'Divide by 0: in Domain:calculate_score for {self.city.city_id}')
            return 0

        return float(format(numer / denom, ".2f"))

    @staticmethod
    def get_normalized(value, info):
        mini = info["min"]
        maxi = info["max"]
        inverse = info["inverse"]

        if inverse:
            return (mini + (1 - ((value - mini) / (maxi - mini)))) * 100
        return ((value - mini) / (maxi - mini)) * 100

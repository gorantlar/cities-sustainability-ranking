import json
from abc import ABC, abstractmethod
from server.resources import helper


class Subdomain(ABC):

    @abstractmethod
    def __init__(self, city, config):
        self.breakdown = {}
        self.score = self.calculate_score(city, config)

    @staticmethod
    def get_breakdown_json_string(subdomain):
        # return subdomain.breakdown
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

        answer = value / maxi
        if inverse:
            answer = (mini / maxi) + (1 - answer)

        return float(format(answer * 100, '.2f'))

    def __str__(self) -> str:
        attrs = [a for a in dir(self) if not a.startswith('__') and not callable(getattr(self, a))]
        retval = '{'
        for attr in attrs:
            retval += (attr + ":" + str(self.__getattribute__(attr)) + ", ")
        retval += '}'
        return retval
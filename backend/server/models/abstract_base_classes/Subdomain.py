import json
from abc import ABC, abstractmethod


class Subdomain(ABC):

    # @staticmethod
    # @property
    # @abstractmethod
    # def label(self):
    #     pass

    @property
    @abstractmethod
    def breakdown(self):
        pass

    @property
    @abstractmethod
    def score(self):
        pass

    @abstractmethod
    def __init__(self, city, config):
        self.__score = self.calculate_score(self, city, config)
        self.__breakdown = {}

    @staticmethod
    @abstractmethod
    def calculate_score(subdomain, city, config):
        pass

    @staticmethod
    def get_breakdown_json(subdomain):
        return json.dumps(subdomain.__breakdown)
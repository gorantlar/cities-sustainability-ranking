from abc import ABC, abstractmethod


class Domain(ABC):

    @staticmethod
    @property
    @abstractmethod
    def subdomains(self):
        pass

    @property
    @abstractmethod
    def score(self):
        pass

    @abstractmethod
    def __init__(self, city, config):
        self.__score = self.calculate_score(self, city, config)

    @staticmethod
    @abstractmethod
    def calculate_score(domain, city, config):
        pass

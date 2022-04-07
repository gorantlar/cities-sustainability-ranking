from abc import ABC, abstractmethod
from server.models.subdomains.WaterAndAir import WaterAndAir
from server.models.subdomains.HabitatAndSettlements import HabitatAndSettlements
from server.models.subdomains.BuiltFormAndTransport import BuiltFormAndTransport
from server.models.subdomains.EmbodimentAndSustenance import EmbodimentAndSustenance
from server.models.subdomains.ProductionAndResourcing import ProductionAndResourcing
from server.models.subdomains.ExchangeAndTransfer import ExchangeAndTransfer
from server.models.subdomains.AccountingAndRegulation import AccountingAndRegulation
from server.models.subdomains.ConsumptionAndUse import ConsumptionAndUse
from server.models.subdomains.LabourAndWelfare import LabourAndWelfare
from server.models.subdomains.TechnologyAndInfrastructure import TechnologyAndInfrastructure
from server.models.subdomains.WealthAndDistribution import WealthAndDistribution
from server.models.subdomains.IdentityAndEngagement import IdentityAndEngagement
from server.models.subdomains.GenderAndGenerations import GenderAndGenerations
from server.models.subdomains.CreativityAndRecreation import CreativityAndRecreation
from server.models.subdomains.MemoryAndProjection import MemoryAndProjection
from server.models.subdomains.BeliefsAndIdeas import BeliefsAndIdeas
from server.models.subdomains.EnquiryAndLearning import EnquiryAndLearning
from server.models.subdomains.WellbeingAndHealth import WellbeingAndHealth


class Domain(ABC):

    @abstractmethod
    def __init__(self, city, subdomains_config):
        self.score = self.calculate_score(city, subdomains_config)

    @abstractmethod
    def calculate_score(self, city, subdomains_config):
        numer = 0
        denom = 0
        for subdomain, subdomain_info in subdomains_config.items():
            # passing columns list to the constructors of subdomains
            self.__setattr__(subdomain, globals()[subdomain](city, subdomain_info["columns"]))
            weight = subdomain_info["weight"]

            temp = self.__getattribute__(subdomain).score
            print("\t", subdomain, temp)
            numer += (weight * temp)
            denom += weight

        if not denom:
            print(f'Divide by 0: in Domain:calculate_score for {self.city.city_id}')
            return 0

        return float(format(numer / denom, ".2f"))

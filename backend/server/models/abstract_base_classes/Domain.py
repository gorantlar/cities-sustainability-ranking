from abc import ABC, abstractmethod
from models.subdomains.WaterAndAir import WaterAndAir
from models.subdomains.HabitatAndSettlements import HabitatAndSettlements
from models.subdomains.BuiltFormAndTransport import BuiltFormAndTransport
from models.subdomains.EmbodimentAndSustenance import EmbodimentAndSustenance
from models.subdomains.ProductionAndResourcing import ProductionAndResourcing
from models.subdomains.ExchangeAndTransfer import ExchangeAndTransfer
from models.subdomains.AccountingAndRegulation import AccountingAndRegulation
from models.subdomains.ConsumptionAndUse import ConsumptionAndUse
from models.subdomains.LabourAndWelfare import LabourAndWelfare
from models.subdomains.TechnologyAndInfrastructure import TechnologyAndInfrastructure
from models.subdomains.WealthAndDistribution import WealthAndDistribution
from models.subdomains.IdentityAndEngagement import IdentityAndEngagement
from models.subdomains.GenderAndGenerations import GenderAndGenerations
from models.subdomains.CreativityAndRecreation import CreativityAndRecreation
from models.subdomains.MemoryAndProjection import MemoryAndProjection
from models.subdomains.BeliefsAndIdeas import BeliefsAndIdeas
from models.subdomains.EnquiryAndLearning import EnquiryAndLearning
from models.subdomains.WellbeingAndHealth import WellbeingAndHealth


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

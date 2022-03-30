from entities.City import City
from entities.EconomicsSubdomains.ExchangeAndTransfer import ExchangeAndTransfer
from entities.EconomicsSubdomains.ProductionAndResourcing import ProductionAndResourcing
from entities.EconomicsSubdomains.ProductionAndResourcing import AccountingAndRegulation
from entities.EconomicsSubdomains.ProductionAndResourcing import ConsumptionAndUse
from entities.EconomicsSubdomains.ProductionAndResourcing import LabourAndWelfare
from entities.EconomicsSubdomains.ProductionAndResourcing import TechnologyAndInfrastructure
from entities.EconomicsSubdomains.ProductionAndResourcing import WealthAndDistribution

class CityEconomics:

    def __init__(self, city: City):
        self.production_and_resourcing = ProductionAndResourcing(city)
        self.exchange_and_transfer = ExchangeAndTransfer(city)
        self.accounting_and_regulation = AccountingAndRegulation(city)
        self.consumption_and_use = ConsumptionAndUse(city)
        self.labour_and_welfare = LabourAndWelfare(city)
        self.technology_and_infrastructure = TechnologyAndInfrastructure(city)
        self.wealth_and_distribution = WealthAndDistribution(city)

    @staticmethod
    def get_city_score(city):
        if not isinstance(city, City):
            raise TypeError("Argument passed is not a city")


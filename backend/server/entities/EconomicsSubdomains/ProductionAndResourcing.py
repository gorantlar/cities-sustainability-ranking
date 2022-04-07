from entities.City import City
from entities.SubdomainUtils import SubdomainUtils

class ProductionAndResourcing(SubdomainUtils):
    def __init__(self, city: City):
        super(ProductionAndResourcing, self).__init__(city, "economics", "production and resourcing")
        self.columns_and_normalized = [
            ["government_finances_expenditure_per_resident_in_2018", 0],
            ["government_finances_revenue_per_resident_in_2018", 0],
            ["government_finances_debt_per_resident_in_2018", 0],
            ["government_finances_cash_and_securities_per_resident_in_2018", 0]]
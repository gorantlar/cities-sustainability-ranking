from models.abstract_base_classes.Subdomain import Subdomain


class EnquiryAndLearning(Subdomain):

    def __init__(self, city, config):
        super().__init__(city, config)

    def calculate_score(self, city, columns_info):
        return super().calculate_score(city, columns_info)

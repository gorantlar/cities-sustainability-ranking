from server.models.abstract_base_classes.Domain import Domain


class Ecology(Domain):

    def __init__(self, city, config):
        super().__init__(city, config)

    def calculate_score(self, city, config):
        return super().calculate_score(city, config)
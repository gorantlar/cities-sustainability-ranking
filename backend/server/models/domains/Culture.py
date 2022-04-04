from server.models.abstract_base_classes.Domain import Domain


class Culture(Domain):

    # label = "Culture"
    subdomains = {}

    @property
    def score(self):
        return self.__score

    def __init__(self, city, config):
        super().__init__(city, config)
        # self.__score = self.calculate_score(city)

    @staticmethod
    def calculate_score(city, config):
        print("calculating score for Culture")
        '''
        1. For each subdomain, pass city and config and ask them to calculate score.
        2. Return average of all scores received.
        '''
        return 0

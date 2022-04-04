from server.models.abstract_base_classes.Subdomain import Subdomain


class IdentityAndEngagement(Subdomain):

    @property
    def breakdown(self):
        return self.__breakdown

    @property
    def score(self):
        return self.__score

    def __init__(self, city, config):
        super().__init__(city, config)
        #self.__score = self.calculate_score(city) #shouldn't be needed
        '''
        1. Add column names in breakdown, initialized with 0 normalized score
        '''
        self.__breakdown = {
            "Two or More Races": 0
        }

    @staticmethod
    def calculate_score(city, config):
        print("calculating score for IdentityAndEngagement")

        '''
        1. For each column in breakdown, calculate it's normalized score and store in breakdown
        2. After that, use config to read weights and calculate final score.
        3. Return final score.
        '''
        return 0
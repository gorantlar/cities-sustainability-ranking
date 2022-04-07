import csv
import sys

class NormalizationHelper:

    __instance = None

    @staticmethod
    def get_instance():
        if not NormalizationHelper.__instance:
            NormalizationHelper.__instance = NormalizationHelper()
        return NormalizationHelper.__instance

    def __init__(self):
        # private
        self.__mins_maxs = {}

        file_path = "C:/Users/ssuryaw1/Downloads/SER517/GIT/SER-517-Neighborhood-Sustainability/backend/server/seed/Economics/data/final500Cities.csv"
        csv_file = open(file_path, "r")
        csvReader = csv.reader(csv_file)
        headers = next(csvReader)

        # columns data offset
        offset = 11

        # add all column names in a map as {col_name: [min, max]}
        for i, col_name in enumerate(headers[offset:]):
            # mins_maxs[col_name] = [sys.maxsize, -sys.maxsize]
            self.__mins_maxs[col_name] = [0, -sys.maxsize]

        for row in csvReader:
            for i, col_name in enumerate(headers[offset:]):
                val = NormalizationHelper.get_value(row[offset + i])

                self.__mins_maxs[col_name][0] = min(val, self.__mins_maxs[col_name][0])
                self.__mins_maxs[col_name][1] = max(val, self.__mins_maxs[col_name][1])


    def get_value(val):
        val = val.strip()
        if val.lower() == "n":
            return 0

        return float(val.replace("%", "")
                     .replace("$", "")
                     .replace(",", "")
                     .replace(" ", ""))


    def get_cols_min_max(self):
        return self.__mins_maxs


# print(NormalizationHelper.get_instance().get_cols_min_max())
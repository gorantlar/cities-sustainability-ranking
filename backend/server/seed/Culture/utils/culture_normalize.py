import os

import pandas as pd


def process_csv():
    os.chdir("..")

    final500cities_csv = pd.read_csv("data/final500Cities.csv")
    normalize(final500cities_csv, 'Speak A Language Other Than English')
    normalize(final500cities_csv, "Bachelor's Degree or Higher")
    normalize(final500cities_csv, "Two or More Races")
    normalize(final500cities_csv, "Park access")
    normalize(final500cities_csv, "Walkability")
    normalize(final500cities_csv, "Limited access to healthy foods")
    normalize(final500cities_csv, "Foreign Born")
    normalize(final500cities_csv, "Close Access to Healthy Foods")
    normalize(final500cities_csv, "Religious Diversity")


def normalize(df, column_name):
    df = df[column_name]
    list_column = []

    # strip '%' from the numbers
    for percentage in df.values.tolist():
        if any(char.isdigit() for char in percentage):
            list_column.append(float(percentage.strip('%')))
        else:
            list_column.append(0)

    normalized_values = []
    max_value = max(list_column)
    for value in list_column:
        normalized_values.append(round((value/max_value) * 100))

    df = pd.read_csv("data/final500Cities_normalized.csv")
    df[column_name] = normalized_values
    print(df)
    df.to_csv('data/final500Cities_normalized.csv', mode='w', index=False)


process_csv()

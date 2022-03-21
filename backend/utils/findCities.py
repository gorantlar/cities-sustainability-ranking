# This code gets the cities list per state from www.city-data.com
# And store it in data/ state-wise

import requests
import xlsxwriter
from bs4 import BeautifulSoup

def get_cities(name, link):
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'html.parser')
    cities = []
    citiesSet = set()

    for ul in soup.find(id="cityTAB").find_all("tr"):
        temp = []
        for td in ul.find_all("td"):
            temp.append(td.text)
        if(temp):
            cities.append([temp[1], int(temp[2].replace(",",""), 10)])

    cities.sort(key = lambda x: x[1], reverse=True)
    # for city in cities:
    #     print(city)
    # print("count: ",len(cities))

    # to excel
    workbook = xlsxwriter.Workbook('data/'+name+'.xlsx')
    worksheet = workbook.add_worksheet()

    for i in range(len(cities) // 2):
        worksheet.write('A'+str(i+1), cities[i][0])
        worksheet.write('B'+str(i+1), cities[i][1])
        citiesSet.add(cities[i][0])

    # space + remaining
    for i in range(len(cities) // 2, len(cities)):
        worksheet.write('A'+str(i+3), cities[i][0])
        worksheet.write('B'+str(i+3), cities[i][1])
        citiesSet.add(cities[i][0])
    workbook.close()
    return [len(cities), len(citiesSet)]



# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    totalCities = 0
    states = [['Alaska cities', 'www.city-data.com/city/Alaska.html'], ['Alabama cities', 'www.city-data.com/city/Alabama.html'], ['Arkansas cities', 'www.city-data.com/city/Arkansas.html'], ['Arizona cities', 'www.city-data.com/city/Arizona.html'], ['California cities', 'www.city-data.com/city/California.html'], ['Colorado cities', 'www.city-data.com/city/Colorado.html'], ['Connecticut cities', 'www.city-data.com/city/Connecticut.html'], ['District of Columbia cities', 'www.city-data.com/city/District-of-Columbia.html'], ['Delaware cities', 'www.city-data.com/city/Delaware.html'], ['Florida cities', 'www.city-data.com/city/Florida.html'], ['Georgia cities', 'www.city-data.com/city/Georgia.html'], ['Hawaii cities', 'www.city-data.com/city/Hawaii.html'], ['Iowa cities', 'www.city-data.com/city/Iowa.html'], ['Idaho cities', 'www.city-data.com/city/Idaho.html'], ['Illinois cities', 'www.city-data.com/city/Illinois.html'], ['Indiana cities', 'www.city-data.com/city/Indiana.html'], ['Kansas cities', 'www.city-data.com/city/Kansas.html'], ['Kentucky cities', 'www.city-data.com/city/Kentucky.html'], ['Louisiana cities', 'www.city-data.com/city/Louisiana.html'], ['Massachusetts cities', 'www.city-data.com/city/Massachusetts.html'], ['Maryland cities', 'www.city-data.com/city/Maryland.html'], ['Maine cities', 'www.city-data.com/city/Maine.html'], ['Michigan cities', 'www.city-data.com/city/Michigan.html'], ['Minnesota cities', 'www.city-data.com/city/Minnesota.html'], ['Missouri cities', 'www.city-data.com/city/Missouri.html'], ['Mississippi cities', 'www.city-data.com/city/Mississippi.html'], ['Montana cities', 'www.city-data.com/city/Montana.html'], ['North Carolina cities', 'www.city-data.com/city/North-Carolina.html'], ['North Dakota cities', 'www.city-data.com/city/North-Dakota.html'], ['Nebraska cities', 'www.city-data.com/city/Nebraska.html'], ['New Hampshire cities', 'www.city-data.com/city/New-Hampshire.html'], ['New Jersey cities', 'www.city-data.com/city/New-Jersey.html'], ['New Mexico cities', 'www.city-data.com/city/New-Mexico.html'], ['Nevada cities', 'www.city-data.com/city/Nevada.html'], ['New York cities', 'www.city-data.com/city/New-York.html'], ['Ohio cities', 'www.city-data.com/city/Ohio.html'], ['Oklahoma cities', 'www.city-data.com/city/Oklahoma.html'], ['Oregon cities', 'www.city-data.com/city/Oregon.html'], ['Pennsylvania cities', 'www.city-data.com/city/Pennsylvania.html'], ['Rhode Island cities', 'www.city-data.com/city/Rhode-Island.html'], ['South Carolina cities', 'www.city-data.com/city/South-Carolina.html'], ['South Dakota cities', 'www.city-data.com/city/South-Dakota.html'], ['Tennessee cities', 'www.city-data.com/city/Tennessee.html'], ['Texas cities', 'www.city-data.com/city/Texas.html'], ['Utah cities', 'www.city-data.com/city/Utah.html'], ['Virginia cities', 'www.city-data.com/city/Virginia.html'], ['Vermont cities', 'www.city-data.com/city/Vermont.html'], ['Washington cities', 'www.city-data.com/city/Washington.html'], ['Wisconsin cities', 'www.city-data.com/city/Wisconsin.html'], ['West Virginia cities', 'www.city-data.com/city/West-Virginia.html'], ['Wyoming cities', 'www.city-data.com/city/Wyoming.html']]
    toCheck = []
    for name, link in states:
        cnt, unique = get_cities(name, "http://"+link)
        if(cnt != unique):
            toCheck.append([name, cnt, unique])

        print(name, ": ",cnt, " unique cities: ", unique)
        totalCities += cnt

    print("toCheck ", toCheck)
    print("totalCities= ", totalCities)


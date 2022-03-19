# This code gets the state names and the ref link from https://www.city-data.com/
import requests
from bs4 import BeautifulSoup

def print_hi(name):
    home = 'https://www.city-data.com/'
    # housingUrl = 'https://www.city-data.com/housing/houses-Anderson-Alaska.html'
    html_text = requests.get(home).text
    soup = BeautifulSoup(html_text, 'html.parser')
    cnt = 0
    states = []
    for ul in soup.find_all("ul", class_ = "tab-list tab-list-short"):
        for li in ul.find_all("li"):
            states.append([li.find("a")["title"], li.find("a")["href"]])
        cnt += 1
        if(cnt == 4):
            break
    print(states)
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')


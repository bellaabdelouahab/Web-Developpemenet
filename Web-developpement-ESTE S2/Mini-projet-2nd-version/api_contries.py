import requests
def get_country():
    b =  requests.get("https://api.covid19api.com/countries")
    b = b.json()
    b=[i['Country'] for i in b]
    return b
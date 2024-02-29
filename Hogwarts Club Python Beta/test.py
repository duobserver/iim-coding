import requests

r = requests.get('https://hp-api.lainocs.fr/characters')
print(r.json())
import json

path = "config.json"

def get_config():
    return json.loads(open(path, "r").read().lower())

# print(get_config())
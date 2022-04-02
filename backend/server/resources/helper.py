import json

path = "./server/resources/config.json"


def get_config():
    return json.loads(open(path, "r").read().lower())


def write_config(config_dict):
    f = open(path, "w")
    f.write(json.dumps(config_dict, indent=2))
    f.close()


def get_value(val):
    val = val.strip()
    if val.lower() == "n":
        return 0

    return float(val.replace("%", "")
                 .replace("$", "")
                 .replace(",", "")
                 .replace(" ", ""))


def get_float(val):
    val = val.strip().replace("%", "").replace("$", "").replace(",", "").replace(" ", "")
    try:
        return float(val)
    except ValueError:
        # print("Not a float")
        return 0

# print(get_config())

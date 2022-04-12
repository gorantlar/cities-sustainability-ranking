import json

path = "server/resources/config.json"


def get_config():
    return json.loads(open(path, "r").read())


def write_config(config_dict):
    config_old_dict = get_config()
    print(config_old_dict)
    print(type(config_old_dict))

    min_max_updated = False

    for domain in config_old_dict['domains']:
        print(domain)
        domain_dict = config_old_dict['domains'][domain]
        print(domain_dict)
        for subdomain in domain_dict['subdomains']:
            subdomain_dict = domain_dict['subdomains'][subdomain]
            col_dict = subdomain_dict['columns']
            for col in col_dict:
                col_min_max = col_dict[col]
                if 'min' not in col_min_max or col_min_max['min'] == -1 or config_dict[col][0] < col_min_max['min']:
                    col_min_max['min'] = config_dict[col][0]
                    min_max_updated = True

                if 'max' not in col_min_max or col_min_max['max'] == -1 or col_min_max['max'] < config_dict[col][1]:
                    col_min_max['max'] = config_dict[col][1]
                    min_max_updated = True

    if min_max_updated:
        f = open(path, "w")
        f.write(json.dumps(config_old_dict, indent=2))
        f.close()
    return min_max_updated


def get_value(val):
    val = str(val).strip()
    if val.lower() == "n" or val.lower() == "nan%":
        return 0

    val = val.replace("%", "") \
        .replace("$", "") \
        .replace(",", "") \
        .replace(" ", "")

    try:
        return float(val)
    except ValueError:
        return val


def get_float(val):
    if type(val) is float or type(val) is int:
        return val

    val = val.strip().replace("%", "").replace("$", "").replace(",", "").replace(" ", "")
    try:
        return float(val)
    except ValueError:
        # print("Not a float")
        return -1


def getDomains():
    return json.loads(open(path, "r").read())["domains"]


'''
"DialogueAndReconciliation": {
          "weight": 1,
          "columns": {
            "beliefs": {
              "inverse": false,
              "min": 1000,
              "max": 50000,
              "weight": 1
            }
          }
        },
        "EthicsAndAccountability": {
          "weight": 1,
          "columns": {
            "acquittal": {
              "inverse": false,
              "min": 1000,
              "max": 50000,
              "weight": 1
            }
          }
        }
'''

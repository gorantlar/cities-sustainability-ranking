import json

path = "C:/Users/ssuryaw1/Downloads/SER517/GIT/SER-517-Neighborhood-Sustainability/backend/server/resources/config.json"


def get_config():
    return json.loads(open(path, "r").read())


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

def getDomains():
    return json.loads(open(path, "r").read())["domains"]

# print(getDomains())
#
# domains = getDomains()
# for domain in domains:
#     for sub in domains[domain]["subdomains"]:
#         file = open("C:/Users/ssuryaw1/Downloads/SER517/GIT/SER-517-Neighborhood-Sustainability/backend/server/models/subdomains/"+sub+".py","w")
#         template = open("subdomain_temp.txt", "r").read()
#         file.write(template.replace("__class_name__", sub))
#         file.close()

#
# domains = getDomains()
# for domain in domains:
#     for sub in domains[domain]["subdomains"]:
#         print("from models.subdomains."+sub+" import "+sub)
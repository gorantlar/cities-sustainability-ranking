from server.models.City import City
from server.models.abstract_base_classes.Domain import Domain
from server.models.abstract_base_classes.Subdomain import Subdomain


def merge_subdomain_tx(tx, city, domain, subdomain):
    if not isinstance(subdomain, Subdomain):
        raise TypeError("Argument passed is not a server.models.abstract_base_classes.Subdomain")

    if not isinstance(domain, Domain):
        raise TypeError("Argument passed is not a server.models.abstract_base_classes.Domain")

    if not isinstance(city, City):
        raise TypeError("Argument passed is not a server.models.City")

    statement = __get_merge_statement(city, domain, subdomain)
    result = tx.run(statement)
    record = result.single()
    value = record.value()
    info = result.consume()
    return value, info


def __get_merge_statement(city, domain, subdomain):
    merge = 'MATCH (a:City {city_id : "' + getattr(city, 'city_id') + '"})'
    merge += '-[r:HAS_DOMAIN]->(d:Domain {name: "' + domain.__class__.__name__ + '"})\n'
    merge += 'MERGE (d)-[rr:HAS_SUBDOMAIN]->(s:Subdomain {name: "' + subdomain.__class__.__name__ + '"})\n'
    merge += 'ON CREATE SET s.score = ' + subdomain.score + ' SET s.breakdown = "' + subdomain.get_breakdown_json + '" RETURN s'
    return merge

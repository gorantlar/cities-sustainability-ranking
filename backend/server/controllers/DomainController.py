from server.models.City import City
from server.models.abstract_base_classes.Domain import Domain


def merge_domain_tx(tx, city, domain):
    if not isinstance(domain, Domain):
        raise TypeError("Argument passed is not a server.models.abstract_base_classes.Domain")

    if not isinstance(city, City):
        raise TypeError("Argument passed is not a server.models.City")

    statement = __get_merge_statement(city, domain)
    result = tx.run(statement)
    record = result.single()
    value = record.value()
    info = result.consume()
    return value, info


def __get_merge_statement(city, domain):
    merge = 'MATCH (a:City {city_id : "' + getattr(city, 'city_id') + '"})\n'
    merge += 'MERGE (a)-[r:HAS_DOMAIN]->(d:Domain {name: "' + domain.__class__.__name__ + '"})\n'
    merge += 'ON CREATE SET d.score = ' + domain.score + ' RETURN d'
    return merge

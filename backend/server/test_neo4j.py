from neo4j import GraphDatabase

# Database Credentials

uri             = "bolt://localhost:7687"
userName        = "neo4j"
password        = "test"


# Connect to the neo4j database server
graphDB_Driver  = GraphDatabase.driver(uri, auth=(userName, password))
 
# CQL to query all Persons in graph
cqlNodeQuery = "MATCH (p:Person) RETURN p"

# CQL to query all relationships
# cqlEdgeQuery = "MATCH (x:university {name:'Yale University'})-[r]->(y:university) RETURN y.name,r.miles"
cqlEdgeQuery = "MATCH [KNOWS] RETURN KNOWS"


# Execute the CQL query
with graphDB_Driver.session() as graphDB_Session:

    # Create nodes
    # graphDB_Session.run(cqlCreate)

   

    # Query the graph    
    nodes = graphDB_Session.run(cqlNodeQuery)

   
    print("List of People in the graph:")
    for node in nodes:
        print(node['p'])

    # Query the relationships present in the graph
    # nodes = graphDB_Session.run(cqlEdgeQuery)

    # print("KNOWS")

    # for node in nodes:
    #     print(node)


'''
# CQL to create a graph containing some of the Ivy League universities
cqlCreate = """CREATE (cornell:university { name: "Cornell University"}),

(yale:university { name: "Yale University"}),

(princeton:university { name: "Princeton University"}),

(harvard:university { name: "Harvard University"}),

 

(cornell)-[:connects_in {miles: 259}]->(yale),

(cornell)-[:connects_in {miles: 210}]->(princeton),

(cornell)-[:connects_in {miles: 327}]->(harvard),

 

(yale)-[:connects_in {miles: 259}]->(cornell),

(yale)-[:connects_in {miles: 133}]->(princeton),

(yale)-[:connects_in {miles: 133}]->(harvard),

 

(harvard)-[:connects_in {miles: 327}]->(cornell),

(harvard)-[:connects_in {miles: 133}]->(yale),

(harvard)-[:connects_in {miles: 260}]->(princeton),

 

(princeton)-[:connects_in {miles: 210}]->(cornell),

(princeton)-[:connects_in {miles: 133}]->(yale),

(princeton)-[:connects_in {miles: 260}]->(harvard)"""
'''
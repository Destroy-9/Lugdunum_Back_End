const graphql = require('graphql');

//very first graphql Schema
exports.schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Test',
        fields: () => ({
            message: {
                type: graphql.GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
});

//Object0Type is not yet defined + Database connexion not established
exports.RootQueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        objects0 : {
            type: new graphql.GraphQLList(Object0Type),
            description: 'List of all objects0',
            resolve: () => objects0
        }
    })
});

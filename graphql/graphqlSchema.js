const graphql = require('graphql');
const {
    RootQuery
} = require('./graphqlQuery');
const {
    mainMutation
} = require('./graphqlMutations');


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

//A schema to query users (for now)
exports.mainSchema = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: mainMutation,
    description: 'Main schema'
});
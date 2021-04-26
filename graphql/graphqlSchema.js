const graphql = require('graphql');
const {
    GetAllUsers
} = require('./graphqlQuery');


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
exports.userSchema = new graphql.GraphQLSchema({
    query: GetAllUsers
});
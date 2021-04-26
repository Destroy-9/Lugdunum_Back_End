const graphql = require('graphql');
const {
    UserType
} = require('./graphqlObjects');

//Database connexion not established
exports.GetAllUsers = new graphql.GraphQLObjectType({
    name: 'QueryAllUsers',
    description: 'Query to get a list of all Users',
    fields: () => ({
        users : {
            type: new graphql.GraphQLList(UserType),
            description: 'List of all Users',
            resolve: () => users
        }
    })
});

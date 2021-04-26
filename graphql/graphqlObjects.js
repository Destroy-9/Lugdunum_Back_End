const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

//A graphql object that represents a User
exports.UserType = new GraphQLObjectType({
    name: 'User',
    description: 'represents a User of the Lugdunum app',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        password: {type: GraphQLString},
    })
});
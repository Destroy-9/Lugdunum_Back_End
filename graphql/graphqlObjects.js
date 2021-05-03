const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

//A graphql object that represents a User
exports.UserType = new GraphQLObjectType({
    name: 'User',
    description: 'represents a User of the Lugdunum app',
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        username: {type: GraphQLString },
        password: { type: GraphQLString }
    }
});
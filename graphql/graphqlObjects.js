const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

exports.TimeType = new GraphQLObjectType( {
    name: 'Time',
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        hour: { type: GraphQLInt },
        minutes: { type: GraphQLInt }
    }
});

exports.LocalizationType = new GraphQLObjectType( {
    name: 'Localization',
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        lat: { type: GraphQLInt },
        long: { type: GraphQLInt },
        timeId: { type: GraphQLList(GraphQLID) }
    }
});

//A graphql object that represents a User
exports.UserType = new GraphQLObjectType({
    name: 'User',
    description: 'represents a User of the Lugdunum app',
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        localizationID: { type: GraphQLList(GraphQLID) }
    }
});

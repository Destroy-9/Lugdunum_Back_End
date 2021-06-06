const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const LocalizationType = new GraphQLObjectType({
    name: 'Localization',
    description: 'Represents localization with lat and lng',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        lat: {type: GraphQLFloat},
        lng: {type: GraphQLFloat},
        userId: {type: GraphQLID},
        user: {
            type: UserType,
            resolve: (localization) => {
                return users.find(user => user.id === localization.userId)
            }
        },
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString}
    })
});

//A graphql object that represents a User
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'represents a User of the Lugdunum app',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        localizations: {
            type: new GraphQLList(LocalizationType),
            resolve: (user) => {
                return localizations.filter(localization => localization.userId === user.id)
            }
        },
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString}
    })
});

module.exports = {
    LocalizationType: LocalizationType,
    UserType: UserType
}
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const TimeType = new GraphQLObjectType({
    name: 'Time',
    description: 'Represents a Time',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        hour: {type: GraphQLInt},
        minutes: {type: GraphQLInt}
    })
})

const LocalizationType = new GraphQLObjectType({
    name: 'Localization',
    description: 'Represents localization with lat and long',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        lat: {type: GraphQLFloat},
        long: {type: GraphQLFloat},
        userId: {type: GraphQLID},
        user: {
            type: UserType,
            resolve: (localization) => {
                return users.find(user => user.id === localization.userId)
            }
        },
        timeId: { type: GraphQLID },
        time: {
            type : TimeType,
            resolve: (localization) => {
                return times.find(time => time.id === localization.timeId)
            }
        }
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
        }
    })
});

module.exports = {
    LocalizationType: LocalizationType,
    UserType: UserType,
    TimeType: TimeType
}
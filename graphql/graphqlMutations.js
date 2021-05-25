const graphql = require('graphql');
const {
    UserType,
    LocalizationType,
    TimeType
} = require('./graphqlObjects');
const {
    UserModel,
    LocalizationModel,
    TimeModel
} = require('../mongo/mongoSchema');


exports.mainMutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields:{
        createUser: {
            type: UserType,
            args: {
                username: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
                password: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
            },
            //not correct interaction with database (data validation needed)
            resolve: (root, args, context, info) => {
                const createUser = new UserModel(args);
                return createUser.save();
            }
        },
        addLocalization: {
            type: LocalizationType,
            args: {
                lat: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
                long: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
                userId: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
                timeId: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (root, args, context, info) => {
                const addLocalization = new LocalizationModel(args);
                return addLocalization.save();
            }
        },
        addTime: {
            type: TimeType,
            args: {
                hour: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
                minutes: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}
            },
            resolve: (root, args, context, info) => {
                const addTime = new TimeModel(args);
                return addTime.save();
            }
        }
    }
});
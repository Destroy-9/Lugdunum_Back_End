const graphql = require('graphql');
const bcrypt = require('bcrypt');

const {
    UserType,
    LocalizationType,
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
            resolve: async (root, args, context, info) => {
                //Hashing the password
                const hash = await bcrypt.hash(args.password, 10);
                const createUser = new UserModel({
                    username: args.username,
                    password: hash
                });
                return createUser.save();
            }
        },
        addLocalization: {
            type: LocalizationType,
            args: {
                lat: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
                long: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
                userId: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
            },
            resolve: (root, args, context, info) => {
                const addLocalization = new LocalizationModel(args);
                return addLocalization.save();
            }
        }
    }
});
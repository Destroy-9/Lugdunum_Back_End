const graphql = require('graphql');
const {
    UserType
} = require('./graphqlObjects');
const {
    UserModel
} = require('../mongo/mongoSchema');

//query to get users and their args
exports.RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    description: 'This is the root of all queries',
    fields: () => ({
        users : {
            type: new graphql.GraphQLList(UserType),
            description: 'Query to get a list of all Users',
            resolve: () => {
                return UserModel.find().exec();
            }
        },
        user : {
            type: UserType,
            description: 'Query a single user from id',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                return UserModel.findById(args.id).exec();
            }
        }
    })
});

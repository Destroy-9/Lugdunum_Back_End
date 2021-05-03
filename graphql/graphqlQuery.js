const graphql = require('graphql');
const {
    UserType
} = require('./graphqlObjects');
const {
    User
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
                return User.find().exec();
            }
        },
        user : {
            type: UserType,
            description: 'Query a single user from id',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: () => {
                return User.findById(args.id).exec();
            }
        }
    })
});

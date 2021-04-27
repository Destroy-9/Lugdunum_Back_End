const graphql = require('graphql');
const {
    UserType
} = require('./graphqlObjects');
const {
    UserModel
} = require('../mongo/mongoSchema');


exports.mainMutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields:{
        user: {
            type: UserType,
            args: {
                username: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
                password: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
            },
            //not correct interaction with database (data validation needed)
            resolve: (root, args, context, info) => {
                var user = new UserModel(args);
                return user.save();
            }
        }
    }
});
const graphql = require('graphql');
const {
    UserType,
    LocalizationType,
    TimeType
} = require('./graphqlObjects');
const {
    UserModel
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
                var createUser = new UserModel(args);
                return createUser.save();
            }
        }
        //addLocalization: {
        //    type: UserType,
        //}
    }
});
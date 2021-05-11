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
        },
        localizations : {
            type: new graphql.GraphQLList(LocalizationType),
            description: 'Query to get a list of all Localizations',
            resolve: () => {
                return LocalizationModel.find().exec();
            }
        },
        localization : {
            type: LocalizationType,
            description: 'Query a localization from id',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                return LocalizationModel.findById(args.id).exec();
            }
        },
        times : {
            type: new graphql.GraphQLList(TimeType),
            description: 'Query to get a list of all times',
            resolve: () => {
                return TimeModel.find().exec();
            }
        },
        time : {
            type: TimeType,
            description: 'Query a time from id',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                return TimeModel.findById(args.id).exec();
            }
        },
        deleteUser : {
            type : UserType,
            description : 'Query to delete a user',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                return UserModel.findByIdAndDelete(args.id);
            }
        },
        updateUser : {
            type: UserType,
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
                username: {type: graphql.GraphQLNonNull(graphql.GraphQLString) },
                password: {type: graphql.GraphQLNonNull(graphql.GraphQLString) }
            },
            resolve: (source, args, context, info) =>{
                return UserModel.findByIdAndUpdate(args.id,args);;
            }

        }
    })
});

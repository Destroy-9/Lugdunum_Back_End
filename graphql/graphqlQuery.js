const graphql = require('graphql');
const {
    UserType,
    LocalizationType
} = require('./graphqlObjects');
const {
    UserModel,
    LocalizationModel,
} = require('../mongo/mongoSchema');
const bcrypt = require('bcrypt');

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
        // A query to login
        // It takes a username and a password as arguments and returns true if the login is successful, false otherwise
        login : {
            type: graphql.GraphQLBoolean,
            description: 'returns true if login was successful, false otherwise',
            args: {
                username: { type : graphql.GraphQLNonNull(graphql.GraphQLString) },
                password: { type : graphql.GraphQLNonNull(graphql.GraphQLString) },
            },
            resolve: async (source, args, context, info) => {
                const userFound = await UserModel.find({username: args.username}).exec();
                //we take the first user of the array since username is unique
                let valid = await bcrypt.compare(args.password, userFound[0].password);
                if (!valid) {
                    return false;
                }else{
                    console.log('Login Error');
                    return true;
                }
                return false;
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
                return UserModel.findByIdAndUpdate(args.id,args);
            }

        },
        deleteLocalization : {
            type: LocalizationType,
            description: 'Query to delete a localization',
            args: {
                id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                return LocalizationModel.findByIdAndDelete(args.id);
            }
        },
        updateLocalization : {
            type: LocalizationType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
                lat: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
                long: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)}
            },
            resolve: (source, args, context, info) =>{
                return LocalizationModel.findByIdAndUpdate(args.id,args);
            }
        }
    })
});

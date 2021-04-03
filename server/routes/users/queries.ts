import { Thunk, GraphQLFieldConfigMap, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import Users from './model';
import UserType from './resolvers';

const Queries: Thunk<GraphQLFieldConfigMap<any, any>> = {
    GetUsers: {
        type: GraphQLList(UserType),
        description: 'List of users',
        args: { limit: { type: GraphQLInt } },
        resolve: async (_, args) => await Users.find().limit(args.limit || 50),
    },
    GetUser: {
        type: UserType,
        description: 'Get a single user by id or username',
        args: {
            id: { type: GraphQLString },
            username: { type: GraphQLString }
        },
        resolve: async (_, args) => {
            if (!args.id && !args.username) throw Error('Id or username required')

            if (args.id) return await Users.findById(args.id)

            return await Users.find({ username: args.username })
        }
    },
}

export default Queries

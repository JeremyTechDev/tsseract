import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import Posts from '../routes/posts/model';
import Users from '../routes/users/model';
import Tags from '../routes/tags/model';
import PostType from '../routes/posts/resolvers';
import UserType from '../routes/users/resolvers';
import TagType from '../routes/tags/resolvers';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        GetPost: {
            type: PostType,
            description: 'Get a single post by id',
            args: { id: { type: GraphQLString } },
            resolve: async (_, args) =>
                await Posts.findByIdAndUpdate(
                    args.id,
                    { $inc: { interactions: 1 } },
                    { new: true },
                )
        },
        GetPosts: {
            type: GraphQLList(PostType),
            description: 'List of posts',
            args: { limit: { type: GraphQLInt } },
            resolve: async (_, args) => await Posts.find().sort({ createdAt: 'desc' }).limit(args.limit || 50),
        },
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
        GetTags: {
            type: GraphQLList(TagType),
            description: 'List of tags',
            args: {
                similarTo: {
                    description: 'Find a tag named similar to param',
                    type: GraphQLString,
                },
                limit: { type: GraphQLInt },
            },
            resolve: async (_, args) => {
                if (args.similarTo) {
                    return await Tags.find({
                        name: new RegExp(args.similarTo, 'i')
                    }).sort({ popularity: 'desc' }).limit(args.limit || 50)
                }

                return await Tags.find().sort({ popularity: 'desc' }).limit(args.limit || 50)
            }
        },
        GetTag: {
            type: TagType,
            description: 'Get a single tag by id',
            args: { id: { type: GraphQLNonNull(GraphQLString) }, },
            resolve: async (_, args) => await Tags.findById(args._id)
        },
    }),
});

export default RootQueryType;

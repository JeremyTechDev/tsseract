import { Thunk, GraphQLFieldConfigMap, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

import PostType from './resolvers';
import Posts from './model';

const Queries: Thunk<GraphQLFieldConfigMap<any, any>> = {
    GetPost: {
        type: PostType,
        description: 'Get a single post by id',
        args: { id: { type: GraphQLNonNull(GraphQLString) } },
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
}

export default Queries;

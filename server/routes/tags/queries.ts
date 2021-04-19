import { Thunk, GraphQLFieldConfigMap, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import Tags from './model';
import TagType from './resolvers';

const Queries: Thunk<GraphQLFieldConfigMap<any, any>> = {
    GetTags: {
        type: GraphQLList(TagType),
        description: 'List of tags',
        args: { limit: { type: GraphQLInt } },
        resolve: async (_, args) => await Tags.find()
            .sort({ popularity: 'desc' })
            .limit(args.limit || 50),
    },
    GetTagLike: {
        type: GraphQLList(TagType),
        description: 'List of tags with a name similar to the arg `like`',
        args: {
            like: { type: GraphQLNonNull(GraphQLString) },
            limit: { type: GraphQLInt },
        },
        resolve: async (_, args) => await Tags.find({
            name: new RegExp(args.like, 'i'),
        }).limit(args.limit || 50)
    },
}

export default Queries;

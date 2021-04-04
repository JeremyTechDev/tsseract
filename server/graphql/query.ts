import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import UserQueries from '../routes/users/queries';

import Posts from '../routes/posts/model';
import Tags from '../routes/tags/model';
import PostType from '../routes/posts/resolvers';
import TagType from '../routes/tags/resolvers';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        ...UserQueries,
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

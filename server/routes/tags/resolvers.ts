import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import PostType from '../posts/resolvers';
import Posts from '../posts/model';

const TagType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Tag',
    description: 'Represents a tag that is assigned to a post',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        popularity: { type: GraphQLNonNull(GraphQLInt) },
        posts: {
            type: GraphQLList(PostType),
            description: "List of posts with the tag",
            resolve: async (parent) => await Posts.find({ tags: parent.id })
        }
    }),
});

export default TagType;

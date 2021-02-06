import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const TagType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Tag',
  description: 'Represents a tag that is assigned to a post',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    popularity: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

export default TagType;

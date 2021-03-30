import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import User from '../users/model';
import UserType from '../users/resolvers';
import { iComment } from '../../@types';

const CommentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Represents a comment in a post published by a user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: GraphQLNonNull(UserType),
      description: 'The user who published the comment',
      resolve: async (parent: iComment) => await User.findById(parent.user),
    },
    body: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default CommentType;

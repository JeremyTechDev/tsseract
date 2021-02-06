import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Tag from '../tags/model';
import Users from '../users/model';
import TagType from '../tags/resolvers';
import UserType from '../users/resolvers';
import CommentType from '../comments/resolvers';
import { iPost } from '../../@types';

const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  description: 'Represents a post published by a user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: GraphQLNonNull(UserType),
      description: 'The user who published the post',
      resolve: async (parent: iPost) => await Users.findById(parent.user),
    },
    title: { type: GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLNonNull(GraphQLString) },
    cover: { type: GraphQLString },
    interactions: { type: GraphQLNonNull(GraphQLInt) },
    likes: {
      type: GraphQLList(UserType),
      description: 'List of the users who have liked the post',
      resolve: async (parent: iPost) =>
        await parent.likes.map(async (user) => Users.findById(user)),
    },
    comments: { type: GraphQLList(CommentType) },
    tags: {
      type: GraphQLList(TagType),
      description: 'List of the comments added to the post',
      resolve: async (parent: iPost) =>
        await parent.tags.map(async (tagId) => await Tag.findById(tagId)),
    },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default PostType;

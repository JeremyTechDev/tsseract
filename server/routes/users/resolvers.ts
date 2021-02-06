import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Users from './model';
import { iUser } from '../../@types';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'Represents the user data',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    avatar: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    following: {
      type: GraphQLList(UserType),
      description: 'List of users to the current user follows',
      resolve: async (parent: iUser) =>
        await parent.following.map(async (user) => await Users.findById(user)),
    },
    followers: {
      type: GraphQLList(UserType),
      description: 'List of followers of the current user',
      resolve: async (parent: iUser) =>
        await parent.followers.map(async (user) => await Users.findById(user)),
    },
  }),
});

export default UserType;

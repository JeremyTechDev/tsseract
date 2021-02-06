import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Posts, { PostType } from './models/post';
import Users, { UserType } from './models/user';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    post: {
      type: PostType,
      description: 'Get a single post by id',
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => await Posts.findById(args.id),
    },
    posts: {
      type: GraphQLList(PostType),
      description: 'List of posts',
      resolve: async () => await Posts.find(),
    },
    users: {
      type: GraphQLList(UserType),
      description: 'List of users',
      resolve: async () => await Users.find(),
    },
    user: {
      type: UserType,
      description: 'Get a single user by id',
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => await Users.findById(args.id),
    },
    userPosts: {
      type: GraphQLList(PostType),
      description: 'List of posts of a user given their id',
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => await Posts.find({ user: args.id }),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

export default schema;

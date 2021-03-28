import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import Users from './model';
import Posts from '../posts/model'
import PostType from '../posts/resolvers'
import { iUser } from '../../@types';

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    description: 'Represents the user data',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        following: {
            type: GraphQLList(UserType),
            description: 'List of users to the current user follows',
            resolve: (parent: iUser) =>
                parent.following.map(async (user) => await Users.findById(user)),
        },
        followers: {
            type: GraphQLList(UserType),
            description: 'List of followers of the current user',
            resolve: (parent: iUser) =>
                parent.followers.map(async (user) => await Users.findById(user)),
        },
        posts: {
            type: GraphQLList(PostType),
            description: 'List of posts published by the user',
            resolve: async (parent: iUser) => await Posts.find({ user: parent._id })
        },
        feed: {
            type: GraphQLList(PostType),
            description: 'List of post by the users the current user follows',
            resolve: async (parent: iUser) => await Posts.find({ user: { $in: parent.following } })
        }
    }),
});

export default UserType;

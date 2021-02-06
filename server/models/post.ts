import Joi from '@hapi/joi';
import { Schema, Types, model } from 'mongoose';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Users, { UserType } from './user';
import { CommentType, commentsSchema } from './comment';
import Tag, { TagType } from './tag';
import regex from '../helpers/regex';
import { iPost } from '../@types';

export const postsSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  title: {
    type: String,
    min: 5,
    max: 145,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  interactions: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: 'Users',
      default: [],
    },
  ],
  comments: {
    type: [commentsSchema],
    default: [],
  },
  tags: [
    {
      type: Types.ObjectId,
      ref: 'Tags',
      default: [],
    },
  ],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Posts = model('Posts', postsSchema, 'posts');

export const PostType: GraphQLObjectType = new GraphQLObjectType({
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

export const validatePost = <T>(post: T) => {
  const schema = Joi.object({
    user: Joi.string().regex(regex.objectId).required(),
    title: Joi.string().min(5).max(145).required(),
    body: Joi.string().required(),
    cover: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    likes: Joi.array().items(Joi.string().regex(regex.objectId)),
    interactions: Joi.number().min(0),
    comments: Joi.array().items(Joi.object()),
    updatedAt: Joi.date().timestamp(),
    createdAt: Joi.date().timestamp(),
  });

  return schema.validate(post);
};

export default Posts;

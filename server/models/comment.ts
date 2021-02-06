import Joi from '@hapi/joi';
import { Schema, Types } from 'mongoose';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import User, { UserType } from './user';
import regex from '../helpers/regex';
import { iComment } from '../@types';

export const commentsSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export const CommentType: GraphQLObjectType = new GraphQLObjectType({
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

export const validateComment = <T>(comment: T) => {
  const schema = Joi.object({
    user: Joi.string().regex(regex.objectId).required(),
    body: Joi.string().required(),
    updatedAt: Joi.date().timestamp(),
    createdAt: Joi.date().timestamp(),
  });

  return schema.validate(comment);
};

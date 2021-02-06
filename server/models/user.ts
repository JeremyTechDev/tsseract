import Joi from '@hapi/joi';
import { Schema, Types, model } from 'mongoose';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import regex from '../helpers/regex';
import { iUser } from '../@types';

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 1,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    default: null,
    maxlength: 255,
    minlength: 1,
    required: false,
    trim: true,
  },
  email: {
    lowercase: true,
    maxlength: 255,
    minlength: 2,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 255,
    minlength: 8,
    required: false,
    default: null,
  },
  avatar: {
    default: '',
    trim: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  following: {
    type: [{ type: Types.ObjectId, ref: 'Users' }],
    default: [],
  },
  followers: {
    type: [{ type: Types.ObjectId, ref: 'Users' }],
    default: [],
  },
});

const Users = model('Users', userSchema);

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

export const validateUser = <T>(user: T) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).trim().required(),
    googleId: Joi.string().min(1).max(255).trim(),
    avatar: Joi.string().trim(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim()
      .required(),
    password: Joi.string().trim().min(8).max(26),
    following: Joi.array().items(Joi.string().regex(regex.objectId)),
    followers: Joi.array().items(Joi.string().regex(regex.objectId)),
  });

  return schema.validate(user);
};

export default Users;

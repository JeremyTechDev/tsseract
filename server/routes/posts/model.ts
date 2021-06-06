import Joi from '@hapi/joi';
import { Schema, Types, model } from 'mongoose';

import { commentsSchema } from '../comments/model';
import regex from '../../helpers/regex';

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

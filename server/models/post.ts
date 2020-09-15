import { Schema, Types, Document, model } from 'mongoose';
import Joi from '@hapi/joi';

import { commentsSchema } from './comment';
import regex from '../helpers/regex';

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
  likes: {
    type: [Types.ObjectId],
    ref: 'Users',
    default: [],
  },
  comments: {
    type: [commentsSchema],
    default: [],
  },
  tags: {
    type: [Types.ObjectId],
    ref: 'Tags',
    default: [],
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export interface IPost extends Document {
  user: Types.ObjectId;
  title: string;
  body: string;
  cover: string;
  comments: [];
  likes: Types.ObjectId[];
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export default model('Posts', postsSchema, 'posts');

export const validatePost = <T>(post: T) => {
  const schema = Joi.object({
    user: Joi.string().regex(regex.objectId).required(),
    title: Joi.string().min(5).max(145).required(),
    body: Joi.string().required(),
    cover: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    likes: Joi.array().items(Joi.string().regex(regex.objectId)),
    comments: Joi.array().items(Joi.object()),
    updatedAt: Joi.date().timestamp(),
    createdAt: Joi.date().timestamp(),
  });

  return schema.validate(post);
};

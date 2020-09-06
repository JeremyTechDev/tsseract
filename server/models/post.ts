import { Schema, Types, Document, model } from 'mongoose';
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

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
    type: Number,
    default: 0,
    min: 0,
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
  likes: number;
  comments: [];
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export default model('Posts', postsSchema);

export const validatePost = (post: any) => {
  const schema = Joi.object({
    user: Joi.string().regex(regex.objectId).required(),
    title: Joi.string().min(5).max(145).required(),
    body: Joi.string().required(),
    likes: Joi.number().min(0),
    cover: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Joi.object()),
    updatedAt: Joi.date().format('YYYY-MM-DD').utc(),
    createdAt: Joi.date().format('YYYY-MM-DD').utc(),
  });

  return schema.validate(post);
};

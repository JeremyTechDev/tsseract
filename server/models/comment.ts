import { Schema, Types, Document } from 'mongoose';
import Joi from '@hapi/joi';

import regex from '../helpers/regex';

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

export interface IComment extends Document {
  user: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export const validateComment = <T>(comment: T) => {
  const schema = Joi.object({
    user: Joi.string().regex(regex.objectId).required(),
    body: Joi.string().required(),
    updatedAt: Joi.date().timestamp(),
    createdAt: Joi.date().timestamp(),
  });

  return schema.validate(comment);
};

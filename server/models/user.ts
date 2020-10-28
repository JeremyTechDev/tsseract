import { Schema, Types, Document, model } from 'mongoose';
import Joi from '@hapi/joi';

import regex from '../helpers/regex';

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 1,
    required: true,
    trim: true,
  },
  username: {
    lowercase: true,
    maxlength: 50,
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
    required: true,
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
  birthDate: {
    type: Date,
    required: true,
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

export default model('Users', userSchema);

export const validateUser = <T>(user: T) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).trim().required(),
    username: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required()
      .regex(regex.username),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim()
      .required(),
    password: Joi.string().trim().min(8).max(26).required(),
    birthDate: Joi.date().timestamp().required(),
    following: Joi.array().items(Joi.string().regex(regex.objectId)),
    followers: Joi.array().items(Joi.string().regex(regex.objectId)),
  });

  return schema.validate(user);
};

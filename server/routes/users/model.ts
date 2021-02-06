import Joi from '@hapi/joi';
import { Schema, Types, model } from 'mongoose';

import regex from '../../helpers/regex';

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

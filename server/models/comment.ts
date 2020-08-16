import { Schema, Types } from 'mongoose';
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const { regularExpressions } = require('../helpers');

const commentsSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const validateComment = (comment: any) => {
  const schema = Joi.object({
    user: Joi.string().regex(regularExpressions.objectId).required(),
    body: Joi.string().required(),
    likes: Joi.number().min(0),
    updatedAt: Joi.date().format('YYYY-MM-DD').utc(),
    createdAt: Joi.date().format('YYYY-MM-DD').utc(),
  });

  return schema.validate(comment);
};

exports.commentsSchema = commentsSchema;
exports.validateComment = validateComment;

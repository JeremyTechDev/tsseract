const mongoose = require('mongoose');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { commentsSchema } = require('./comment');
const { regularExpressions } = require('../../../helpers');

const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
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
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Post = new mongoose.model('Posts', postsSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    user: Joi.string().regex(regularExpressions.objectId).required(),
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

exports.Post = Post;
exports.validatePost = validatePost;

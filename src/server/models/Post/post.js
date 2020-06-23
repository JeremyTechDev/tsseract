const mongoose = require('mongoose');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { objectIdRegExp } = require('../../../helpers');

const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 145,
  },
  body: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  likes: {
    default: 0,
    min: 0,
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = new mongoose.model('Posts', postsSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    user: Joi.string().pattern(objectIdRegExp).required(),
    title: Joi.string().min(5).max(145).required(),
    body: Joi.string().required(),
    likes: Joi.number().min(0),
    cover: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    updatedAt: Joi.date().format('YYYY-MM-DD').utc(),
    createdAt: Joi.date().format('YYYY-MM-DD').utc(),
  });

  return schema.validate(post);
};

exports.Post = Post;
exports.validatePost = validatePost;

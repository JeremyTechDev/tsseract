const mongoose = require('mongoose');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

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
  tags: {
    type: Array,
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

const Posts = new mongoose.model('Posts', postsSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    title: Joi.string().min(5).max(145).required(),
    body: Joi.string().required(),
    cover: Joi.string(),
    tags: Joi.array(),
    updatedAt: Joi.date().format('YYYY-MM-DD').utc().required(),
    createdAt: Joi.date().format('YYYY-MM-DD').utc().required(),
  });

  return schema.validate(post);
};

exports.Posts = Posts;
exports.validatePost = validatePost;

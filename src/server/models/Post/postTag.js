const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { regularExpressions } = require('../../../helpers');

const postTagSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Posts',
  },
  tagId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Tags',
  },
});

const PostTag = new mongoose.model('PostsTags', postTagSchema);

const validatePostTag = (postTag) => {
  const schema = Joi.object({
    postId: Joi.string().regex(regularExpressions.objectId).required(),
    tagId: Joi.string().regex(regularExpressions.objectId).required(),
  });

  return schema.validate(postTag);
};

exports.PostTag = PostTag;
exports.validatePostTag = validatePostTag;

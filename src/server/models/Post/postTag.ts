import { Schema, Types, model } from 'mongoose';
const Joi = require('@hapi/joi');
const { regularExpressions } = require('../../helpers/regularExpressions');

const postTagSchema = new Schema({
  postId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Posts',
  },
  tagId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Tags',
  },
});

const PostTag = model('PostsTags', postTagSchema);

const validatePostTag = (postTag: any) => {
  const schema = Joi.object({
    postId: Joi.string().regex(regularExpressions.objectId).required(),
    tagId: Joi.string().regex(regularExpressions.objectId).required(),
  });

  return schema.validate(postTag);
};

exports.PostTag = PostTag;
exports.validatePostTag = validatePostTag;

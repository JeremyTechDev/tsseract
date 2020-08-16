import { Schema, model } from 'mongoose';
const Joi = require('@hapi/joi');

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 45,
    unique: true,
  },
  popularity: {
    type: Number,
    default: 1,
    min: 0,
  },
});

const Tag = model('Tags', tagSchema);

const validateTags = (tags: [string]) => {
  const schema = Joi.object({
    name: Joi.string()
      .max(45)
      .regex(/^[a-z0-9]+$/i)
      .required(),
    popularity: Joi.number().min(0),
  });

  const validTags = tags.map((tag) => schema.validate(tag).error);
  return validTags.some((tagResult: boolean) => tagResult);
};

exports.Tag = Tag;
exports.validateTags = validateTags;

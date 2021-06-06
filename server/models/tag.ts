import { Schema, model } from 'mongoose';
import Joi from '@hapi/joi';

import regex from '../helpers/regex';

export const tagSchema = new Schema({
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

export default model('Tags', tagSchema, 'tags');

export const validateTags = (tags: string[]) => {
  const schema = Joi.object({
    name: Joi.string().max(45).regex(regex.tag).required(),
    popularity: Joi.number().min(0),
  });

  const validTags = tags.map((tag) => schema.validate({ name: tag }).error);
  return validTags.some((tagResult) => tagResult);
};

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const tagSchema = new mongoose.Schema({
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

const Tag = new mongoose.model('Tags', tagSchema);

const validateTag = (tag) => {
  const schema = Joi.object({
    name: Joi.string()
      .max(45)
      .regex(/^[a-z0-9]+$/i)
      .required(),
    popularity: Joi.number().min(0),
  });

  return schema.validate(tag);
};

exports.Tag = Tag;
exports.validateTag = validateTag;

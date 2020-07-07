const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const pswComplexity = require('joi-password-complexity');
const { JWT_KEY } = require('../config/env');

const { regularExpressions } = require('../helpers');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 1,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 255,
    minlength: 8,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 2,
    required: true,
    trim: true,
    unique: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.generateAuthToken = (id) => {
  return jwt.sign({ id }, JWT_KEY);
};

const User = new mongoose.model('Users', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).trim().required(),
    username: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required()
      .regex(regularExpressions.username),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim()
      .required(),
    password: Joi.required(), // validated with passwordComplexity
    birthDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  });

  const isValidPassword = pswComplexity(undefined, 'Password').validate(
    user.password,
  );
  if (isValidPassword.error) return isValidPassword;

  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;

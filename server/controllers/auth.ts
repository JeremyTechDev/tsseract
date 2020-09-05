const Joi = require('@hapi/joi');
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

const { User } = require('../models/user');
const { cookieCreator } = require('../helpers');

/**
 * Creates a new user
 * @param req Express request
 * @param res Express response
 * @param req.body User data
 */
const auth: RequestHandler = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).send({ error: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send({ error: 'Invalid username or password' });

    const { cookie, cookieConfig } = cookieCreator(user._id);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    res.send({ data: { login: true } });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const validate = (req: any) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).max(26).required(),
  });

  return schema.validate(req);
};

module.exports = { auth };

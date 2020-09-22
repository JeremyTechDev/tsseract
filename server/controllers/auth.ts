import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

import User, { IUser } from '../models/user';
import cookieCreator from '../helpers/cookieCreator';

/**
 * Creates a new user
 * @param req Express request
 * @param res Express response
 * @param req.body User data
 */
export const authenticate: RequestHandler = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { username, password } = req.body;

    const user = (await User.findOne({ username })) as IUser;
    if (!user)
      return res.status(400).send({ error: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send({ error: 'Invalid username or password' });

    const { cookie, cookieConfig } = cookieCreator(user._id);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    res.send({ data: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deauthenticate: RequestHandler = (req, res) => {
  const oldCookie = req.cookies.profile;

  res.clearCookie('tsseract-auth-token');
  res.send({ data: { oldCookie } });
};

const validate = <T>(userData: T) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).max(26).required(),
  });

  return schema.validate(userData);
};

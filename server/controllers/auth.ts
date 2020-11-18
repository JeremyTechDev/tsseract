import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

import User from '../models/user';
import cookieCreator from '../helpers/cookieCreator';
import { iUser } from '../@types';

/**
 * Authenticates a existing user
 * @param req Express request
 * @param res Express response
 * @param req.body User data
 */
export const authenticate: RequestHandler = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { username, password } = req.body;

    const user = (await User.findOne({ username })) as iUser;
    if (!user)
      return res.status(400).send({ error: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send({ error: 'Invalid username or password' });

    const userToken = {
      _id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
    };

    const { cookie, cookieConfig } = cookieCreator(userToken);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    res.send(userToken);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Returns the user info within the auth token
 * @param req Express request
 * @param res Express response
 */
export const getTokenData: RequestHandler = (req, res) => {
  const { _id, email, name, username } = req.cookies.profile;

  res.send({ name, username, email, _id });
};

/**
 * Removes auth token
 * @param req Express request
 * @param res Express response
 */
export const deauthenticate: RequestHandler = (req, res) => {
  const { name, username, email, _id } = req.cookies.profile;

  res.clearCookie('tsseract-auth-token');
  res.send({ name, username, email, _id });
};

const validate = <T>(userData: T) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).max(26).required(),
  });

  return schema.validate(userData);
};

import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

import User from '../users/model';
import cookieCreator from '../../helpers/cookieCreator';
import { iUser } from '../../@types';

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

    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as iUser;
    if (!user || !user.password)
      return res.status(400).send({ error: 'Invalid email or password' });

    const isValidPassword = await bcrypt.compare(
      password,
      user.password as string,
    );
    if (!isValidPassword)
      return res.status(400).send({ error: 'Invalid email or password' });

    const userToken = {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      googleId: user.googleId,
    };

    const { cookie, cookieConfig } = cookieCreator(userToken);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    return res.send(userToken);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Authenticates a user that was created with Google Auth
 * @param req Express request
 * @param res Express response
 */
export const googleAuthenticate: RequestHandler = async (req, res) => {
  const { googleId, email } = req.body;

  try {
    const { error } = validateGoogleUser(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    let user = (await User.findOne({ googleId })) as iUser;
    const isNew = !Boolean(user);

    if (!user) {
      const emailIsTaken = await User.findOne({ email });
      if (emailIsTaken)
        return res.status(400).send({ error: 'Email already taken' });

      user = new User({ ...req.body }) as iUser;
      await user.save();
    }

    const userToken = {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      googleId: user.googleId,
    };

    const { cookie, cookieConfig } = cookieCreator(userToken);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    return res.send(Object.assign({}, userToken, { isNew }));
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
  const { _id, email, name, googleId, avatar } = req.cookies.profile;

  return res.send({ name, googleId, email, _id, avatar });
};

/**
 * Removes auth token
 * @param req Express request
 * @param res Express response
 */
export const deauthenticate: RequestHandler = (req, res) => {
  const { name, googleId, email, _id } = req.cookies.profile;

  res.clearCookie('tsseract-auth-token');
  return res.send({ name, googleId, email, _id });
};

const validate = <T>(userData: T) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim()
      .required(),
    password: Joi.string().min(8).max(26).required(),
  });

  return schema.validate(userData);
};

const validateGoogleUser = <T>(user: T) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).trim().required(),
    googleId: Joi.string().min(1).max(255).trim().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim()
      .required(),
  });

  return schema.validate(user);
};

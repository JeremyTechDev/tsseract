// @ts-nocheck
import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';

import User, { validateUser } from '../models/user';
import cookieCreator from '../helpers/cookieCreator';
import { iUser } from '../@types';
import arrayToObj from '../helpers/arrayToObj';

// to select all the user data but their password
const SELECT =
  '_id name username email birthDate createdAt followers following avatar';

const output = (user: iUser) => {
  return {
    _id: user.id,
    birthDate: user.birthDate,
    createdAt: user.createdAt,
    email: user.email,
    followers: arrayToObj(user.followers, '_id'),
    following: arrayToObj(user.following, '_id'),
    name: user.name,
    username: user.username,
    avatar: user.avatar,
  };
};

/**
 * Creates a new user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
export const createUser: RequestHandler = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const isUsernameTaken = await User.findOne({ username: req.body.username });
    const isEmailTaken = await User.findOne({ email: req.body.email });

    if (isUsernameTaken)
      return res.status(409).send({ error: 'Username already taken' });
    if (isEmailTaken)
      return res.status(409).send({ error: 'Email already taken' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    Object.assign(req.body, { password: hashedPassword });

    const user = new User({ ...req.body }) as iUser;
    await user.save();

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
 * Retrieve a user by id
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.id User id
 */
export const retrieveUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = (await User.findById(userId)
      .select(SELECT)
      .populate('following', SELECT)
      .populate('followers', SELECT)) as iUser;

    if (!user)
      return res.status(404).send({ error: 'No used found with the given id' });

    res.send(output(user));
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Retrieve a user by username
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.username User username
 */
export const retrieveUserByUsername: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const user = (await User.findOne({ username })
      .select(SELECT)
      .populate('following', SELECT)
      .populate('followers', SELECT)) as iUser;

    if (!user)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    res.send(output(user));
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Updates some fields of the given user
 * @param {Object} req Express request
 * @param {Object} res Express response
 */
export const updateUser: RequestHandler = async (req, res) => {
  const { _id: userId } = req.cookies.profile;

  const schema = Joi.object({
    avatar: Joi.string().trim(),
    name: Joi.string().trim().min(3).max(255),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(2)
      .max(255)
      .trim(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  try {
    const user = (await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true },
    )) as iUser;

    return res.send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Toggles the follow state in two users
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.followToUsername user to toggle follow
 */
export const toggleFollow: RequestHandler = async (req, res) => {
  const { followToUsername } = req.params;
  const followBy: iUser = req.cookies.profile;

  try {
    const followTo = (await User.findOne({
      username: followToUsername,
    })) as iUser;

    if (!followTo)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    if (followTo._id.equals(followBy._id))
      return res
        .status(409)
        .send({ error: 'You cannot follow your own account' });

    // If the auth user already follows the account, unfollow
    let newFollowBy: iUser, newFollowTo: iUser, action: 'follow' | 'unfollow';
    if (followBy.following.includes(followTo._id)) {
      // Remove the followTo user from the followBy following list
      newFollowBy = (await User.findOneAndUpdate(
        { _id: followBy._id },
        { $pull: { following: followTo._id } },
        { new: true },
      )) as iUser;

      // Remove the follower (followBy) from the followTo user
      newFollowTo = (await User.findOneAndUpdate(
        { _id: followTo._id },
        { $pull: { followers: followBy._id } },
        { new: true },
      )) as iUser;

      action = 'unfollow';
    } else {
      // Add the new following (followTo) to followBy user
      newFollowBy = (await User.findOneAndUpdate(
        { _id: followBy._id },
        { $push: { following: followTo._id } },
        { new: true },
      )) as iUser;

      // Add the new follower (followBy) to the followTo user
      newFollowTo = (await User.findOneAndUpdate(
        { _id: followTo._id },
        { $push: { followers: followBy._id } },
        { new: true },
      )) as iUser;

      action = 'follow';
    }

    res.send({ following: newFollowBy, follower: newFollowTo, action });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Deletes a user by id
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.id User id
 */
export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { _id: userId } = req.cookies.profile;
    const user = await User.findByIdAndDelete(userId).select(SELECT);

    res.send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

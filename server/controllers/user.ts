import { RequestHandler, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User, { IUser, validateUser } from '../models/user';
const { cookieCreator } = require('../helpers');

// to select all the user data but their password
const SELECT = '_id name username email birthday createdAt followers following';

/**
 * Creates a new user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
const create: RequestHandler = async (req, res) => {
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

    const user = new User({ ...req.body }) as IUser;
    await user.save();

    const { cookie, cookieConfig } = cookieCreator(user._id);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    const { _id, name, username, email, birthDate, createdAt } = user;
    res.send({ data: { _id, name, username, email, birthDate, createdAt } });
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
const retrieveUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select(SELECT);
    if (!user)
      return res.status(404).send({ error: 'No used found with the given id' });

    res.send({ data: user });
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
const retrieveUserByUsername: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(SELECT);

    if (!user)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    res.send({ data: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Follow a user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.followToUsername user to follow
 */
const follow = async (
  req: Request & { user: { id: string | null } },
  res: Response,
) => {
  const { followToUsername } = req.params;
  const { id: followById } = req.user;

  try {
    const followTo = (await User.findOne({
      username: followToUsername,
    })) as IUser;
    const followBy = (await User.findById(followById)) as IUser;

    if (!followTo)
      return res
        .status(404)
        .send({ message: 'No user found with the given username' });

    if (followTo._id.equals(followById!))
      return res
        .status(409)
        .send({ message: 'You cannot follow your own account' });

    if (followBy.following.includes(followTo._id))
      return res
        .status(409)
        .send({ message: 'You already follow that account' });

    const newFollowBy = await User.findOneAndUpdate(
      { _id: followById },
      { $push: { following: followTo._id } },
      { new: true },
    );

    const newFollowTo = await User.findOneAndUpdate(
      { _id: followTo._id },
      { $push: { followers: followById } },
      { new: true },
    );

    res.send({ data: { following: newFollowBy, follower: newFollowTo } });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Unfollow a user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.followToUsername user to unfollow
 */
const unfollow = async (
  req: Request & { user: { id: string | null } },
  res: Response,
) => {
  const { followToUsername } = req.params;
  const { id: followById } = req.user;

  try {
    const followTo = (await User.findOne({
      username: followToUsername,
    })) as IUser;
    const followBy = (await User.findById(followById)) as IUser;

    if (!followTo)
      return res
        .status(404)
        .send({ message: 'No user found with the given username' });

    if (followTo._id.equals(followById!))
      return res
        .status(409)
        .send({ message: 'You cannot unfollow your own account' });

    if (!followBy.following.includes(followTo._id))
      return res
        .status(409)
        .send({ message: "You don't follow the given account" });

    const newFollowBy = await User.findOneAndUpdate(
      { _id: followById },
      { $pull: { following: followTo._id } },
      { new: true },
    );

    const newFollowTo = await User.findOneAndUpdate(
      { _id: followTo._id },
      { $pull: { followers: followById } },
      { new: true },
    );

    res.send({ data: { following: newFollowBy, follower: newFollowTo } });
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
const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId).select(SELECT);

    if (!user)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    res.send({ data: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  create,
  deleteUser,
  follow,
  retrieveUser,
  retrieveUserByUsername,
  unfollow,
};

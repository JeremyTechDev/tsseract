import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import User, { IUser, validateUser } from '../models/user';
import cookieCreator from '../helpers/cookieCreator';

// to select all the user data but their password
const SELECT =
  '_id name username email birthDate createdAt followers following';

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

    const user = new User({ ...req.body }) as IUser;
    await user.save();

    const { cookie, cookieConfig } = cookieCreator(user._id);
    res.cookie('tsseract-auth-token', cookie, cookieConfig);

    res.send({ data: user, authToken: cookie });
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
export const retrieveUserByUsername: RequestHandler = async (req, res) => {
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
export const follow: RequestHandler = async (req, res) => {
  const { followToUsername } = req.params;
  const followBy = req.cookies.profile;

  try {
    const followTo = (await User.findOne({
      username: followToUsername,
    })) as IUser;

    if (!followTo)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    if (followTo._id.equals(followBy._id))
      return res
        .status(409)
        .send({ error: 'You cannot follow your own account' });

    if (followBy.following.includes(followTo._id))
      return res.status(409).send({ error: 'You already follow that account' });

    const newFollowBy = await User.findOneAndUpdate(
      { _id: followBy._id },
      { $push: { following: followTo._id } },
      { new: true },
    );

    const newFollowTo = await User.findOneAndUpdate(
      { _id: followTo._id },
      { $push: { followers: followBy._id } },
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
export const unfollow: RequestHandler = async (req, res) => {
  const { followToUsername } = req.params;
  const followBy = req.cookies.profile;

  try {
    const followTo = (await User.findOne({
      username: followToUsername,
    })) as IUser;

    if (!followTo)
      return res
        .status(404)
        .send({ error: 'No user found with the given username' });

    if (followTo._id.equals(followBy._id))
      return res
        .status(409)
        .send({ error: 'You cannot unfollow your own account' });

    if (!followBy.following.includes(followTo._id))
      return res
        .status(409)
        .send({ error: "You don't follow the given account" });

    const newFollowBy = await User.findOneAndUpdate(
      { _id: followBy._id },
      { $pull: { following: followTo._id } },
      { new: true },
    );

    const newFollowTo = await User.findOneAndUpdate(
      { _id: followTo._id },
      { $pull: { followers: followBy._id } },
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
export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { _id: userId } = req.cookies.profile;
    const user = await User.findByIdAndDelete(userId).select(SELECT);

    res.status(204).send({ data: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

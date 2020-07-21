import { RequestHandler } from 'express';
const { User, validate } = require('../models/user');
import bcrypt from 'bcrypt';

/**
 * Creates a new user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
const create: RequestHandler = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const isUsernameTaken = await User.findOne({ username: req.body.username });
    const isEmailTaken = await User.findOne({ email: req.body.email });

    if (isUsernameTaken) return res.status(409).send('Username already taken');
    if (isEmailTaken) return res.status(409).send('Email already taken');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    Object.assign(req.body, { password: hashedPassword });

    const user = new User({ ...req.body });
    await user.save();

    const token = user.generateAuthToken(user._id);

    const { _id, name, username, email, birthDate, createdAt } = user;
    res
      .header('x-auth-token', token)
      .send({ data: { _id, name, username, email, birthDate, createdAt } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .send({ message: 'No used found with the given id' });

    const { _id, name, username, email, birthDate, createdAt } = user;
    res.send({ data: { _id, name, username, email, birthDate, createdAt } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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
    const userUsername = req.params.username;
    const user = await User.findOne({ username: userUsername });

    if (!user)
      return res
        .status(404)
        .send({ message: 'No user found with the given username' });

    delete user.password;

    const { _id, name, username, email, birthDate, createdAt } = user;
    res.send({ data: { _id, name, username, email, birthDate, createdAt } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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
    const user = await User.findByIdAndDelete(userId);

    if (!user)
      return res
        .status(404)
        .send({ message: 'No user found with the given username' });

    const { _id, name, username, email, birthDate, createdAt } = user;
    res.send({ data: { _id, name, username, email, birthDate, createdAt } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  create,
  retrieveUser,
  retrieveUserByUsername,
  deleteUser,
};

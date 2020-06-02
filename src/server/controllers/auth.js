const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

/**
 * Creates a new user
 * @param req Express request
 * @param res Express response
 * @param req.body User data
 */
exports.auth = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send('Invalid username or password');

    const token = user.generateAuthToken(user._id);

    res.header('x-auth-token', token).send({ data: { login: true } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const validate = (req) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).max(26).required(),
  });

  return schema.validate(req);
};

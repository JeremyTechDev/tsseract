const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Creates a new user
 * @param req Express request
 * @param res Express response
 * @param req.body User data
 */
exports.create = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const isUsernameTaken = await User.findOne({ username: req.body.username });
    const isEmailTaken = await User.findOne({ email: req.body.email });

    if (isUsernameTaken) return res.status(400).send('Username already taken');
    if (isEmailTaken) return res.status(400).send('Email already taken');

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
 * @param req Express request
 * @param res Express response
 * @param res.params.id User id
 */
exports.retrieveUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    const { _id, name, username, email, birthDate, createdAt } = user;
    res.send({ data: { _id, name, username, email, birthDate, createdAt } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

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

    const { _id, name, username, email, birthDate } = user;
    res
      .header('x-auth-token', token)
      .send({ _id, name, username, email, birthDate });
  } catch (error) {
    return res.status(500).send('Ops! something went wrong. Try again later.');
  }
};

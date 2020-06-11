const { Posts, validatePost } = require('../models/posts');

/**
 * Creates a new post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
exports.create = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Posts(req.body);
    await post.save();

    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

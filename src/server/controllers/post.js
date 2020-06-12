const { Post, validatePost } = require('../models/post');

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

    const post = new Post(req.body);
    await post.save();

    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

/**
 * Deletes a post by id
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.id Post id
 */
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndDelete(postId);

    if (!post)
      return res
        .status(404)
        .send({ message: 'No posts found with the given id' });

    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

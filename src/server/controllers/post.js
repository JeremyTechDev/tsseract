const { Post, validatePost } = require('../models/post');

const tagControllers = require('../controllers/tag');
const postTagControllers = require('../controllers/postTag');

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

    // Save post
    const post = new Post(req.body);
    await post.save();

    // Save tag
    const tag = await tagControllers.findOrCreate(req.body.tags[0]);
    if (tag.error) return res.status(tag.statusCode).send(tag.error);

    // Save postTag relation
    const postTag = await postTagControllers.create({
      tagId: tag._id,
      postId: post._id,
    });

    if (postTag.error)
      return res.status(postTag.statusCode).send(postTag.error);

    res.send({ data: { post, tag, postTag } });
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

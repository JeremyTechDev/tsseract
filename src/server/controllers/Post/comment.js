const { Post, validatePost } = require('../../models/Post/post');
const { validateComment } = require('../../models/Post/comment');

/**
 * Creates a new comment in a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
exports.create = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.body.post);

    delete req.body.post;
    post.comments.unshift(req.body);

    const { body, comments, title, user } = post;
    const newPost = validatePost({ body, comments, title, user: String(user) });
    if (newPost.error) {
      return res.status(400).send(newPost.error.details[0].message);
    }

    await post.save();
    res.send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

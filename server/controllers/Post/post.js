const { Post, validatePost } = require('../../models/Post/post');
const { PostTag } = require('../../models/Post/postTag');

const tagControllers = require('./tag');
const postTagControllers = require('./postTag');

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

    /**
     * Return an array of objects with the
     * tags and postTag data for each tag
     */
    const postTagsResults = await Promise.all(
      req.body.tags.map(async (tagName) => {
        // Save tag
        const tag = await tagControllers.findOrCreate(tagName);

        // Handle tag errors
        if (tag.error) return res.status(tag.statusCode).send(tag.error);

        // Save postTag relation
        const postTag = await postTagControllers.create({
          postId: String(post._id),
          tagId: String(tag._id),
        });

        // Handle postTag error
        if (postTag.error) {
          return res.status(postTag.statusCode).send(postTag.error);
        }

        return { tag, postTag };
      }),
    );

    res.send({ data: { post, tags: postTagsResults } });
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
    await PostTag.findOneAndDelete({ postId });

    if (!post)
      return res
        .status(404)
        .send({ message: 'No posts found with the given id' });

    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

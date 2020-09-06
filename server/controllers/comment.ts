import { RequestHandler } from 'express';
import Post, { IPost, validatePost } from '../models/post';
import { validateComment } from '../models/comment';

/**
 * Creates a new comment in a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
export const createComment: RequestHandler = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const post = (await Post.findById(req.params.postId)) as IPost;
    if (!post)
      return res.status(404).send({ error: 'No post found with the given id' });

    // post.comments.unshift(req.body); use update here

    const { body, comments, title, user } = post;
    const newPost = validatePost({ body, comments, title, user: String(user) });
    if (newPost.error) {
      return res.status(400).send({ error: newPost.error.details[0].message });
    }

    await post.save();
    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

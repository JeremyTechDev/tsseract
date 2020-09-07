import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import Post, { IPost } from '../models/post';
import { validateComment } from '../models/comment';

/**
 * Creates a new comment in a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
export const createComment: RequestHandler = async (req, res) => {
  try {
    const { postId } = req.params;

    const { error } = validateComment(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    if (!mongoose.isValidObjectId(postId))
      return res.status(404).send({ error: 'No post found with the given id' });

    const post = (await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: req.body } },
      { new: true },
    )) as IPost;

    if (!post)
      return res.status(404).send({ error: 'No post found with the given id' });

    res.send({ data: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

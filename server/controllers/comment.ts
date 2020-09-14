import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import Post, { IPost } from '../models/post';
import { validateComment, IComment } from '../models/comment';

/**
 * Creates a new comment in a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
export const createComment: RequestHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const { _id: userId } = req.cookies.profile;

    const { error } = validateComment(
      Object.assign(req.body, { user: userId.toString() }),
    );
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

/**
 * Deletes a comment in a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.params.commentId comment id
 */
export const deleteComment: RequestHandler = async (req, res) => {
  const { commentId } = req.params;
  const { _id: userId } = req.cookies.profile;

  try {
    const post = (await Post.findOne({ 'comments._id': commentId })) as IPost;

    if (!post)
      return res
        .status(404)
        .send({ error: 'No post found with the given comment id' });

    post.comments.forEach(async (comment: IComment) => {
      if (comment.user.equals(userId) && comment._id.equals(commentId)) {
        const newPost = (await Post.findByIdAndUpdate(
          post._id,
          { $pull: { comments: { _id: commentId } } },
          { new: true },
        )) as IPost;

        return res.send({ data: newPost });
      }
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

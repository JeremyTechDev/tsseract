import { RequestHandler } from 'express';

import Post, { validatePost } from '../models/post';
import { validateTags } from '../models/tag';
import { findOrCreate as findOrCreateTag } from './tag';
import { iTag, iPost } from '../@types';

const SELECT_USER = '_id name avatar username email';

/**
 * Creates a new post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
export const createPost: RequestHandler = async (req, res) => {
  try {
    const { _id: userId } = req.cookies.profile;
    const { error } = validatePost(
      Object.assign(req.body, { user: userId.toString() }),
    );
    if (error) return res.status(400).send({ error: error.details[0].message });

    let createdTags: iTag[] = [];
    if (req.body.tags && req.body.tags.length) {
      const tagsError = validateTags(req.body.tags);
      if (tagsError)
        return res.status(400).send({ error: 'Invalid tag or tags' });

      createdTags = <iTag[]>await Promise.all(
        req.body.tags.map(async (tagName: string) => {
          return await findOrCreateTag(tagName);
        }),
      );

      if (!createdTags.some((tag) => tag)) {
        return res
          .status(400)
          .send({ error: 'An error ocurred while creating the tags' });
      }
    }

    const post = new Post({ ...req.body, tags: createdTags }) as iPost;
    await post.save();

    return res.send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Returns a given amount of posts from all users
 * @param {Object} req Express request
 * @param {Object} res Express response
 */
export const retrieveAll: RequestHandler = async (req, res) => {
  const { limit = 50 } = req.query;

  try {
    const posts = (await Post.find()
      .limit(+limit)
      .populate('user', SELECT_USER)
      .populate('likes', SELECT_USER)
      .populate('tags')
      .sort({ createdAt: 'desc' })) as iPost[];

    res.send(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Retrieves a post found by id
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.params.postId post id
 */
export const findById: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = (await Post.findByIdAndUpdate(
      postId,
      { $inc: { interactions: 1 } },
      { new: true },
    )
      .populate('user', SELECT_USER)
      .populate('comments.user', SELECT_USER)
      .populate('tags')) as iPost;

    if (!post)
      return res
        .status(404)
        .send({ error: 'No post found with the given id.' });

    return res.send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Toggle the user like state of a post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.params.postId post id
 * @param {Object} req.cookies.profile._id user id
 */
export const toggleLike: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const { _id: userId } = req.cookies.profile;

  try {
    const post = (await Post.findByIdAndUpdate(postId, {
      $inc: { interactions: 1 },
    })) as iPost;

    if (!post)
      return res
        .status(404)
        .send({ error: 'No post found with the given id.' });

    const likes = post.likes.map((user) => user.toString());

    const update = likes.includes(userId) ? '$pull' : '$push';
    const newPost = await Post.findByIdAndUpdate(
      post._id,
      { [update]: { likes: userId } },
      { new: true },
    );

    res.send(newPost);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Retrieves all posts by a given user
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.cookies.profile User data
 */
export const getPostsBy: RequestHandler = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const posts = await Post.find({ user: userId })
      .populate('user', SELECT_USER)
      .populate('comments.user', SELECT_USER)
      .populate('tags');

    res.send(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Retrieves all posts that of the accounts a user follows
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.cookies.profile User data
 */
export const getPostsFeed: RequestHandler = async (req, res) => {
  try {
    const { following } = req.cookies.profile;

    const posts = await Post.find({ user: { $in: following } });

    res.send(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Deletes a post by id
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {String} res.params.id Post id
 */
export const deletePost: RequestHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = (await Post.findByIdAndDelete(postId)) as iPost;

    if (!post)
      return res
        .status(404)
        .send({ error: 'No posts found with the given id' });

    res.send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

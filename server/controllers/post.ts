import { RequestHandler } from 'express';

const { Post, validatePost } = require('../models/post');
const { validateTags } = require('../models/tag');
const tagControllers = require('./tag');

interface Tag {
  _id?: string;
  error?: object;
}

/**
 * Creates a new post
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Object} req.body User data
 */
const create: RequestHandler = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let createdTags: Tag[] = [];
    if (req.body.tags && req.body.tags.length) {
      const tagsError = validateTags(req.body.tags);
      if (tagsError)
        return res.status(400).send({ message: 'Invalid tag or tags' });

      createdTags = <Tag[]>await Promise.all(
        req.body.tags.map(async (tagName: string) => {
          return await tagControllers.findOrCreate(tagName);
        }),
      );

      if (!createdTags.some((tag) => tag)) {
        return res
          .status(400)
          .send({ message: 'An error ocurred while creating the tags' });
      }
    }

    const post = new Post({ ...req.body, tags: createdTags });
    await post.save();

    return res.send({ data: post });
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
const deletePost: RequestHandler = async (req, res) => {
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

module.exports = { create, deletePost };

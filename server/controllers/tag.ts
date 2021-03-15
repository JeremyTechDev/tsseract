import { RequestHandler } from 'express';

import Tags from '../models/tag';
import Posts from '../models/post';
import { iTag } from '../@types';

/**
 * Creates or finds a tag by name
 * @param {Object} tagName unique tag name
 */
export const findOrCreate = async (tagName: string) => {
  try {
    const tagExists = (await Tags.findOne({ name: tagName })) as iTag;

    // if tag already exists, increment popularity and return
    if (tagExists) {
      tagExists.popularity++;
      await tagExists.save();

      return { ...tagExists._doc, new: false };
    }

    const newTag = new Tags({ name: tagName }) as iTag;
    await newTag.save();

    return { ...newTag._doc, new: true };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Returns a list of tags with one post, sorted by popularity
 */
export const getTags: RequestHandler = async (req, res) => {
  try {
    const tags = (await Tags.find()
      .sort({ popularity: 'desc' })
      .limit(50)) as iTag[];

    const tagsWithPost = await Promise.all(
      tags.map(async (tag) => ({
        tag,
        post: await Posts.findOne({ tags: tag.id }).select('title tags'),
      })),
    );

    return res.send(tagsWithPost);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Returns a list of tag similar to the query
 * @param {String} req.params.query the tag to find
 */
export const findTagLike: RequestHandler = async (req, res) => {
  try {
    const { query } = req.params;

    const tagsLike = (await Tags.find({
      name: new RegExp(query, 'i'),
    }).limit(50)) as iTag[];

    const result = tagsLike.map((tag) => tag.name);

    return res.send(result || []);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

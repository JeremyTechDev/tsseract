import { RequestHandler } from 'express';

import Tag from '../models/tag';
import { iTag } from '../@types';

/**
 * Creates or finds a tag by name
 * @param {Object} tagName unique tag name
 */
export const findOrCreate = async (tagName: string) => {
  try {
    const tagExists = (await Tag.findOne({ name: tagName })) as iTag;

    // if tag already exists, increment popularity and return
    if (tagExists) {
      tagExists.popularity++;
      await tagExists.save();

      return { ...tagExists._doc, new: false };
    }

    const newTag = new Tag({ name: tagName }) as iTag;
    await newTag.save();

    return { ...newTag._doc, new: true };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Returns a list of tag similar to the query
 * @param {String} req.params.query the tag to find
 */
export const findTagLike: RequestHandler = async (req, res) => {
  try {
    const { query } = req.params;

    const tagsLike = (await Tag.find({
      name: new RegExp(query, 'i'),
    }).limit(50)) as iTag[];

    return res.send(tagsLike || []);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

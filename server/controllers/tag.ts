import Tag from '../models/tag';
import { iTag } from '../types';

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

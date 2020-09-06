import Tag, { ITag } from '../models/tag';

/**
 * Creates or finds a tag by name
 * @param {Object} tagName unique tag name
 */
const findOrCreate = async (tagName: string) => {
  try {
    const tagExists = (await Tag.findOne({ name: tagName })) as ITag;

    // if tag already exists, increment popularity and return
    if (tagExists) {
      tagExists.popularity++;
      await tagExists.save();

      return { ...tagExists._doc, new: false };
    }

    const newTag = new Tag({ name: tagName }) as ITag;
    await newTag.save();

    return { ...newTag._doc, new: true };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { findOrCreate };

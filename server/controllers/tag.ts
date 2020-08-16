const { Tag, validateTag } = require('../../models/Post/tag');

/**
 * Creates or finds a tag by name
 * @param {Object} tagName unique tag name
 */
const findOrCreate = async (tagName: string) => {
  try {
    const { error } = validateTag({ name: tagName });
    if (error) return { error: error.details[0].message };

    const tagExists = await Tag.findOne({ name: tagName });

    // if tag already exists, increment popularity and return
    if (tagExists) {
      tagExists.popularity++;
      await tagExists.save();

      return { ...tagExists._doc, new: false };
    }

    const newTag = new Tag({ name: tagName });
    await newTag.save();

    return { ...newTag._doc, new: true };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { findOrCreate };

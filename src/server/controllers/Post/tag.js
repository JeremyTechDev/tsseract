const { Tag, validateTag } = require('../../models/Post/tag');

/**
 * Creates or finds a tag by name
 * @param {Object} tagName unique tag name
 */
exports.findOrCreate = async (tagName) => {
  try {
    const { error } = validateTag({ name: tagName });
    if (error) return error.details[0].message;

    const tagExists = await Tag.findOne({ name: tagName });

    // if tag already exists
    if (tagExists) return { ...tagExists._doc, new: false, statusCode: 200 };

    const newTag = new Tag({ name: tagName });
    await newTag.save();

    return { ...newTag._doc, new: true, statusCode: 200 };
  } catch (error) {
    return { error: error.message, statusCode: 500 };
  }
};

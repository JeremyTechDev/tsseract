const { PostTag, validatePostTag } = require('../models/postTag');

/**
 * Creates a new postTag relationship
 * @param {Object} postTag post tag data
 */
exports.create = async (postTag) => {
  try {
    const { error } = validatePostTag(postTag);
    if (error) return { error: error.details[0].message, statusCode: 400 };

    const newPostTag = new PostTag(postTag);
    await newPostTag.save();

    return { ...newPostTag._doc, statusCode: 200 };
  } catch (error) {
    return { error: error.message, statusCode: 500 };
  }
};

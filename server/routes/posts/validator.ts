import Joi from '@hapi/joi';
import regex from '../../helpers/regex';

const validatePost = <T>(post: T) => {
    const schema = Joi.object({
        user: Joi.string().regex(regex.objectId).required(),
        title: Joi.string().min(5).max(145).required(),
        body: Joi.string().required(),
        cover: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        likes: Joi.array().items(Joi.string().regex(regex.objectId)),
        interactions: Joi.number().min(0),
        comments: Joi.array().items(Joi.object()),
        updatedAt: Joi.date().timestamp(),
        createdAt: Joi.date().timestamp(),
    });

    return schema.validate(post);
};

export default validatePost;

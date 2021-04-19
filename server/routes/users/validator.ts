import Joi from '@hapi/joi';

import regex from '../../helpers/regex';

const validateUser = <T>(user: T) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).trim().required(),
        avatar: Joi.string().trim(),
        username: Joi.string()
            .min(2)
            .max(50)
            .trim()
            .required()
            .regex(regex.username),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .min(2)
            .max(255)
            .trim()
            .required(),
        password: Joi.string().trim().min(8).max(26).required(),
        birthDate: Joi.date().timestamp().required(),
        following: Joi.array().items(Joi.string().regex(regex.objectId)),
        followers: Joi.array().items(Joi.string().regex(regex.objectId)),
    });

    return schema.validate(user);
};

export default validateUser;

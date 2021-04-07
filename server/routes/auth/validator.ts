import Joi from '@hapi/joi';

const authValidator = <T>(userData: T) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(8).max(26).required(),
    });

    return schema.validate(userData);
};

export default authValidator;

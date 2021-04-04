import Joi from '@hapi/joi';

import regex from '../../helpers/regex';

const validateTags = (tags: string[]) => {
    const schema = Joi.object({
        name: Joi.string().max(45).regex(regex.tag).required(),
        popularity: Joi.number().min(0),
    });

    const validTags = tags.map((tag) => schema.validate({ name: tag }).error);
    return validTags.some((tagResult) => tagResult);
};

export default validateTags;

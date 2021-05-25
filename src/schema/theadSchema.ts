import Joi from 'joi';

const threadSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(25)
        .label("Title")
        .required(),
    description: Joi.string()
        .min(10)
        .max(185)
        .label("Description")
        .required()
});

export default threadSchema;
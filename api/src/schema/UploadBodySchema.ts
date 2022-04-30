import Joi from 'joi';

const UploadBodySchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
});

export default UploadBodySchema;

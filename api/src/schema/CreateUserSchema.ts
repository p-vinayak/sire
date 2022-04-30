import Joi from 'joi';

const CreateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20).required(),
  password: Joi.string().min(6).max(128).required(),
  passwordConfirm: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default CreateUserSchema;

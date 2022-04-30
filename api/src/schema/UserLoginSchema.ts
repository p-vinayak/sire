import Joi from 'joi';

const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default UserLoginSchema;

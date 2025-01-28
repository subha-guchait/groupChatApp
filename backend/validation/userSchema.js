const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().min(8).required(),
});

module.exports = userSchema;

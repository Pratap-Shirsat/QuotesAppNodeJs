const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().trim().min(3).max(15)
    .message('User name should be within 3 to 15 characters length.'),
  password: Joi.string().trim().min(3).max(15)
    .message('password length should be within 3 to 15 characters only.'),
});

const validateUserSchema = (data) => {
  const { error } = userSchema.validate(data);
  if (error) {
    return { code: false, errorMessage: { error: error.details[0].message } };
  } return { code: true };
};

module.exports = validateUserSchema;

const Joi = require('joi');

const quoteSchema = Joi.object({
  quoteId: Joi.string().trim().guid({ version: 'uuidv4' }).message('Not a Valid UUID '),
  quote: Joi.string().trim().min(3).max(200)
    .message('Quote length should be within 3 to 200.'),
  author: Joi.string().trim().min(3).max(30)
    .message('Author name should be within 3 to 100 characters length.'),
  tags: Joi.string().trim().min(3).max(50)
    .message('tags can be within 3 to 50 characters only.'),
  likes: Joi.number().greater(-1).message('likes should be a positive value'),
  dislikes: Joi.number().greater(-1).message('dislikes should be a positive value'),
});

const validateQuoteSchema = (data) => {
  const { error } = quoteSchema.validate(data);
  if (error) {
    return { code: false, errorMessage: { error: error.details[0].message } };
  } return { code: true };
};

module.exports = validateQuoteSchema;

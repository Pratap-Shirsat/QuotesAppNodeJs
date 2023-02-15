# NodeJS - Tutorial

## Creating Routes for Quotes Application

> Create a file `quotes.controller.js` under controllers folder.

> Add controller functions in `quotes.controller.js` which are used in routes file.

```javascript
const { appStatus } = require('../common/constants')();
const quotesService = require('../services/quotes.service')();
const quoteschema = require('./schema/quote.schema');

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await quotesService.getAllQuotes();
    if (quotes) {
      return res.status(appStatus.OK).json(quotes);
    }
    return res.status(appStatus.NOT_FOUND).send('No Quotes are created!');
  } catch (error) {
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const getQuoteById = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const quotes = await quotesService.getQuoteById(quoteId);
      if (quotes) {
        return res.status(appStatus.OK).json(quotes);
      }
      return res.status(appStatus.NOT_FOUND).send('Quote not found!');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const addNewQuote = async (req, res) => {
  try {
    const quote = {
      quote: req.body.quote.trim(),
      author: req.body.author.trim(),
      tags: req.body.tags.trim(),
    };
    const validateRes = quoteschema(quote);
    if (validateRes.code) {
      const quoteRes = await quotesService.addQuote(quote);
      return res.status(appStatus.CREATED).json(quoteRes);
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const updateQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const quote = {};
    if (req.body.quote) {
      quote.quote = req.body.quote.trim();
    }
    if (req.body.author) {
      quote.author = req.body.author.trim();
    }
    if (req.body.tags) {
      quote.tags = req.body.tags.trim();
    }
    const validateRes = quoteschema({ ...quote, quoteId });
    if (validateRes.code) {
      await quotesService.updateQuote(quoteId, quote);
      return res.status(appStatus.OK).json('Quote updated');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const removeQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const quotes = await quotesService.removeQuote(quoteId);
      return res.status(appStatus.OK).json(
        quotes === 0 ? 'Quote is already deleted!' : 'Deleted Quote!',
      );
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const searchQuotes = async (req, res) => {
  try {
    const searchQuerry = {};
    if (req.query.author) {
      searchQuerry.author = `%${req.query.author.trim()}%`;
    }
    if (req.query.quote) {
      searchQuerry.quote = req.query.quote.trim();
    }
    if (req.query.tags) {
      searchQuerry.tags = `%${req.query.tags.trim()}`;
    }
    const validateRes = quoteschema(searchQuerry);
    if (validateRes.code) {
      let quotes = null;
      if (searchQuerry.author) {
        quotes = await quotesService.searchQuotesByAuthor(searchQuerry.author);
      } else if (searchQuerry.quote) {
        quotes = await quotesService.searchQuotesByQuote(searchQuerry.quote);
      } else if (searchQuerry.tags) {
        quotes = await quotesService.searchQuotesByTags(searchQuerry.tags);
      }
      return res.status(appStatus.OK).json(quotes);
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const likeUpQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      await quotesService.likeUpQuote(quoteId);
      return res.status(appStatus.OK).send('Incremented the likes count');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const likeDownQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      await quotesService.likeDownQuote(quoteId);
      return res.status(appStatus.OK).send('Decremented the likes count');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const dislikeUpQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      await quotesService.dislikeUpQuote(quoteId);
      return res.status(appStatus.OK).send('Incremented the dislikes count');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

const dislikeDownQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      await quotesService.dislikeDownQuote(quoteId);
      return res.status(appStatus.OK).send('Decremented the dislikes count');
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};
module.exports = {
  getAllQuotes,
  getQuoteById,
  addNewQuote,
  updateQuote,
  removeQuote,
  searchQuotes,
  likeUpQuote,
  likeDownQuote,
  dislikeUpQuote,
  dislikeDownQuote,
};

```
>create a folder schema under controller folder. 

>create a file `quote.schema.js` file. This will be imported in controller file of quotes and is used for validation.

```javascript
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

```

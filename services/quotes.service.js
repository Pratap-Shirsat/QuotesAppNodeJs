const db = require('../models/index');
const { Op } = require("sequelize");

const Quote = db.Quotes;

const quotesService = () => {
  const getAllQuotes = () => Quote.findAll();

  const getQuoteById = (quoteId) => Quote.findByPk(quoteId);

  const addQuote = (quote) => Quote.create(quote);

  const updateQuote = (quoteId, quote) => Quote.update(quote, {
    where: {
      quote_id: quoteId,
    },
  });

  const removeQuote = (quoteId) => Quote.destroy({
    where: {
      quote_id: quoteId,
    },
  });

  const getAllAuthors = () => Quote.findAll({
    attributes: ['author'],
  });

  const searchQuotesByAuthor = (serachData) => Quote.findAll({
    where: {
      author: {
        [Op.iLike]: serachData,
      },
    },
  });

  const searchQuotesByQuote = (serachData) => Quote.findAll({
    where: {
      quote: {
        [Op.substring]: serachData,
      },
    },
  });

  const searchQuotesByTags = (serachData) => Quote.findAll({
    where: {
      tags: {
        [Op.iLike]: serachData,
      },
    },
  });

  const likeUpQuote = (quoteId) => Quote.increment({ likes: 1 }, { where: { quote_id: quoteId } });

  const likeDownQuote = (quoteId) => Quote.decrement(
    { likes: 1 },
    {
      where: { quote_id: quoteId },
    },
  );

  const dislikeUpQuote = (quoteId) => Quote.increment(
    { dislikes: 1 },
    {
      where: { quote_id: quoteId },
    },
  );

  const dislikeDownQuote = (quoteId) => Quote.decrement(
    { dislikes: 1 },
    {
      where: { quote_id: quoteId },
    },
  );

  return {
    getAllQuotes,
    getQuoteById,
    addQuote,
    updateQuote,
    removeQuote,
    getAllAuthors,
    searchQuotesByAuthor,
    searchQuotesByQuote,
    searchQuotesByTags,
    likeUpQuote,
    likeDownQuote,
    dislikeUpQuote,
    dislikeDownQuote,
  };
};

module.exports = quotesService;

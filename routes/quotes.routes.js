const express = require('express');
const quotesController = require('../controller/quote.controller');
const { auth } = require('../middleware/auth');

const quotesRoutes = () => {
  const quoteRoute = express.Router();

  quoteRoute.get('/', auth.optional, quotesController.getAllQuotes);

  quoteRoute.get('/search', auth.optional, quotesController.searchQuotes);

  quoteRoute.get('/:quoteId', auth.optional, quotesController.getQuoteById);

  quoteRoute.post('/', auth.required, quotesController.addNewQuote);

  quoteRoute.patch('/:quoteId/like/up', auth.required, quotesController.likeUpQuote);

  quoteRoute.patch('/:quoteId/like/down', auth.required, quotesController.likeDownQuote);

  quoteRoute.patch('/:quoteId/dislike/up', auth.required, quotesController.dislikeUpQuote);

  quoteRoute.patch('/:quoteId/dislike/down', auth.required, quotesController.dislikeDownQuote);

  quoteRoute.patch('/:quoteId', auth.required, quotesController.updateQuote);

  quoteRoute.delete('/:quoteId', auth.required, quotesController.removeQuote);

  return quoteRoute;
};

module.exports = quotesRoutes;

# NodeJS - Tutorial

## Creating Routes for Quotes Application

> create `quotes.routes.js` file under routes folder. And add routes to perform CRUD operations in it.

```javascript
const express = require('express');
const quotesController = require('../controller/quote.controller');

const quotesRoutes = () => {
  const quoteRoute = express.Router();
  quoteRoute.get('/', quotesController.getAllQuotes);
  quoteRoute.get('/search', quotesController.searchQuotes);
  quoteRoute.get('/:quoteId', quotesController.getQuoteById);
  quoteRoute.post('/', quotesController.addNewQuote);
  quoteRoute.patch('/:quoteId/like/up', quotesController.likeUpQuote);
  quoteRoute.patch('/:quoteId/like/down', quotesController.likeDownQuote);
  quoteRoute.patch('/:quoteId/dislike/up', quotesController.dislikeUpQuote);
  quoteRoute.patch('/:quoteId/dislike/down', quotesController.dislikeDownQuote);
  quoteRoute.patch('/:quoteId', quotesController.updateQuote);
  quoteRoute.delete('/:quoteId', quotesController.removeQuote);
  return quoteRoute;
};
module.exports = quotesRoutes;
```
> import these routes in `app.js`.

```javascript
const quotesRoutes = require('./routes/quotes.routes');

app.use('/quote', quotesRoutes());

```

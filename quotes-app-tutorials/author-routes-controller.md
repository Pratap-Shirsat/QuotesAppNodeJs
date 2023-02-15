# NodeJS - Tutorial

## Quotesv101f - Create Routes & Controller for Auther

> create a file `author.routes.js` under routes folder.

```javascript
const express = require('express');
const authorController = require('../controller/author.controller');

const authorRoute = () => {
  const router = express.Router();

  router.get('/', authorController.getAllAuthors);

  return router;
};

module.exports = authorRoute;

```

> import this route in `app.js` file

```javascript
app.use('/author', authorRoutes());
```

> create a file `author.controller.js` under controller folder.

```javascript
const quotesService = require('../services/quotes.service')();
const { appStatus } = require('../common/constants')();

const getAllAuthors = async (req, res) => {
  try {
    const authors = await quotesService.getAllAuthors();
    if (authors) {
      return res.status(appStatus.OK).json(authors);
    }
    return res.status(appStatus.NOT_FOUND).send('No Authors found!');
  } catch (error) {
    console.log(`Error in getAllAuthors: ${error}`);
    return res.status(appStatus.SERVER_ERROR).send(error);
  }
};

module.exports = {
  getAllAuthors,
};

```

> The services used in controller file is already added in `quotes.services.js` in previous steps.

> Test the changes after running the application.

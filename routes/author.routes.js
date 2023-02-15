const express = require('express');
const authorController = require('../controller/author.controller');
const { auth } = require('../middleware/auth');

const authorRoute = () => {
  const router = express.Router();

  router.get('/', auth.optional, authorController.getAllAuthors);

  return router;
};

module.exports = authorRoute;

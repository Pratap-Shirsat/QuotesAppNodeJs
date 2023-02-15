const express = require('express');
const { auth } = require('../middleware/auth');
const userController = require('../controller/user.controller');

const userRoutes = () => {
  const userRouter = express.Router();

  // POST new user route (optional, everyone has access)
  userRouter.post('/', auth.optional, userController.registerUser);

  // POST login route (optional, everyone has access)
  userRouter.post('/login', auth.optional, userController.userLogin);

  // GET current route (required, only authenticated users have access)
  userRouter.get('/current', auth.required, userController.getUser);

  return userRouter;
};

module.exports = userRoutes;

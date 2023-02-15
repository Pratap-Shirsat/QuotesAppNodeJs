const db = require('../models/index');

const User = db.Users;

const addNewUser = (user) => User.create(user);

const findUserByUsername = (username) => User.findOne({
  where: {
    username,
  },
});

module.exports = {
  addNewUser,
  findUserByUsername,
};

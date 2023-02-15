const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const getHashedPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return { hash, salt };
};

const validatePassword = (salt, hashedPassword, password) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return hash === hashedPassword;
};

const generateJWT = (username) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.SECRET);
};

module.exports = {
  getHashedPassword,
  validatePassword,
  generateJWT,
};

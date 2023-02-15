const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../models/index');
const { validatePassword } = require('../helpers/authentication');

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password_hash]',
}, (username, password, done) => {
  db.Users.findOne({ username })
    .then((user) => {
      if (!user || validatePassword(user.salt, user.password_hash, password)) {
        return done(null, false, { errors: { 'username or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));

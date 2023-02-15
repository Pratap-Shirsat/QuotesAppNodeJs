# NodeJS - Tutorial

## Quotesv101i - Authentication implementation using Passport

> Install the packages for auth:

```javascript
npm i express-jwt express-jwt jsonwebtoken passport passport-local express-session
```

> Create a folder `helpers` under root dir. This is used to store all the helper functions that are used in project.

> Create a file `authentication.js` under helpers folder and add following code to define auth functions:

```javascript
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

```
> `generateJWT` function is used to generate a auth token which can be used for authentication of routes. Create a folder `middleware` under root dir. Now, create a file `auth.js` in middleware folder and add following code:

```javascript
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'auth',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'auth',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
};

module.exports = {
  auth,
};

```

> This function will be used to check if the auth token sent from route is valid or not; if valid then route will be accessed otherwise access denied error will be throwed. `required` function will allow access to route with authentication, while `optional` function will allow the access of route directly.

> Create `passport.js` file under `config` folder of root dir and add following code.

```javascipt
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

```

> Now, use the `auth` function from auth middleware on routes:

```javascript
const { auth } = require('../middleware/auth');

  // POST login route (optional, everyone has access)
  userRouter.post('/login', auth.optional, userController.userLogin);

  // GET current route (required, only authenticated users have access)
  userRouter.get('/current', auth.required, userController.getUser);
```

> import express-session in `app.js` file and define session for authentication:

```javascript
const session = require('express-session');

app.use(session(
  {
    secret: process.env.SECRET,
    cookie: { maxAge: process.env.MAX_AGE },
    resave: false,
    saveUninitialized: false,
  },
));
```

> Also define route validation in `app.js` file:

```javascript
app.get('*', (req, res) => {
  res.status(404).send('The requested API Not Found');
});
app.post('*', (req, res) => {
  res.status(404).send('The requested API Not Found');
});
app.delete('*', (req, res) => {
  res.status(404).send('The requested API Not Found');
});
app.patch('*', (req, res) => {
  res.status(404).send('The requested API Not Found');
});
```

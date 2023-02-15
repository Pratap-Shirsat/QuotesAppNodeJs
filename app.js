require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const customCss = require('fs').readFileSync((`${process.cwd()}/swagger.css`), 'utf8');
const swaggerDocument = require('./swagger.json');
const db = require('./models/index');
require('./config/passport');
const quotesRoutes = require('./routes/quotes.routes');
const authorRoutes = require('./routes/author.routes');
const userRoutes = require('./routes/user.routes');

const port = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4050',
};
app.use(cors(corsOptions));

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the API of NodeJS Quotes application!');
});

app.use('/quote', quotesRoutes());
app.use('/author', authorRoutes());
app.use('/user', userRoutes());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

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

app.use(session(
  {
    secret: process.env.SECRET,
    cookie: { maxAge: process.env.MAX_AGE },
    resave: false,
    saveUninitialized: false,
  },
));

app.server = app.listen(port, () => {
  console.log(`Quotes Application started on port ${port}`);
});

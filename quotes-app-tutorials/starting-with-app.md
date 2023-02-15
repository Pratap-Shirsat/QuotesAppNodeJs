# NodeJS Tutorials 

### Quotesv101a - Create NodeJS Application Structure

>create a folder with the application name,
and then open this folder inside vs code terminal or a git bash.

> Initialize nodeJs repository by executing following command:
```
  npm init
```
> install other dependences by executing following commands:
```
  npm i body-parser cors dotenv express joi pg pg-hstore sequelize
```
```
  npm i --save -dev sequelize-cli eslint
```
> Now initialize eslint by executing following command:
```
npx eslint --init
```
>select the options according to project and install the plugins at the end of initialization.

>create `app.js` file in root directory and configure the application to run as a express server.
```javascript
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4050',
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the API of NodeJS Quotes application!');
});

app.server = app.listen(port, () => {
  console.log(`Quotes Application started on port ${port}`);
});
```
> check if the file is running by executing command:
```
  node app.js
```
> validate if the project is running properly on the default port 4000

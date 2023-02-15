# NodeJS - Tutorial

## Quotesv101b - Setup Database connection

> Now lets initialize sequelize to create config, model, migration and seeder folder structure:
```
  npx sequelize-cli init
```
> update `config/config.js` file according to db connection like as shown below:

```javascript
{
  "development": {
    "username": "postgres",
    "password": "password",
    "database": "quotes_dev_db",
    "host": "localhost",
    "port":"5400",
    "dialect": "postgres"
  },
}
```
> for postgres(it is port 5432 by default). If you need to specify a different port, use the "`port`" field.

> An `index.js` file will be created under models folder.

> import this file in `app.js` by adding code below:
```javascript
const db = require('./models/index');

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });
```
> Make sure that the database `quotes_dev_db` is already created and db server is up.

> Run the application and varify that you are able to connect the application to db.
In console you will see the text `Executing (default): SELECT 1+1 AS result
Synced db.`

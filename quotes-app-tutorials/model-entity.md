# NodeJS - Tutorial

## Quotesv101c - Add model/entity for Quote with sequelize-cli

> create modal file by executing following command:
```
  npx sequelize-cli model:generate --name Quotes --attributes quote_id:UUID,quote:STRING,author:STRING,likes:INTEGER,dislikes:INTEGER,tags:STRING
```
> This will create a `quotes.js` file under models folder and a `xxxxxx-create-quotes.js` migration file under migration folder.

> Now, update model and migration file according to the need. Set associations or primary key or default values. 

```javascript
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    static associate(models) {
      // define association here
    }
  }
  Quotes.init({
    quote_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quote: DataTypes.STRING,
    author: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tags: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Quotes',
  });
  return Quotes;
};

```

> migration file to be updated according to above model like below:

```javascript
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotes', {
      quote_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quote: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quotes');
  },
};

```

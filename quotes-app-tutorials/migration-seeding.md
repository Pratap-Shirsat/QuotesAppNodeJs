# NodeJS - Tutorial

## Quotesv101d - migration comands and seeding for Quotes with sequelize-cli

> Run following command for migration to create table in database:
```
  npx sequelize-cli db:migrate
```
> to undo migration the:
```
  npx sequelize-cli db:migrate:undo
```
> Create seed file by executing following command:
```
  npx sequelize-cli seed:generate --name initial-quotes
```

> This will create a `xxxxx-initial-quotes.js` file under seeder folder.

> add initial data to be entered in table in `xxxxx-initial-quote` file.

```javascript
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Quotes', [{
      quote_id: 'f944af0d-5637-4810-b102-15509cc2c7d8',
      quote: 'Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is most important',
      author: 'Bill Gates',
      tags: 'technology;',
      likes: 10,
      dislikes: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Quotes', null, {});
  },
};

```
> to insert data to table do following:
```
  npx sequelize-cli db:seed:all
```
> to undo the last seed or recent seed:
```
  npx sequelize-cli db:seed:undo
```
> to undo all seeds then do:
```
  npx sequelize-cli db:seed:undo:all
```

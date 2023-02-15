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
    {
      quote_id: 'eafaf86e-aa92-4fe7-9d10-86add792a80d',
      quote: 'Do not confine your children to your own learning, for they were born in another time.',
      author: 'Chinese Proverb',
      tags: 'life;',
      likes: 1,
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      quote_id: 'cde9d912-7f16-44bb-b5b9-05baa4f52db5',
      quote: 'The great aim of education is not knowledge, but action.',
      author: 'Herbert Spencer',
      tags: 'Education;',
      likes: 15,
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      quote_id: '097848f6-69d0-42a3-bef4-dd30ca300451',
      quote: 'Education is the most powerful weapon that we can use to change the world.',
      author: 'Nelson Mandela',
      tags: 'Education;',
      likes: 105,
      dislikes: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Quotes', null, {});
  },
};

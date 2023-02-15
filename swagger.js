const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Quotes API',
    description: 'This is swagger documentation of NodeJS API project of Quotes Application',
    contact: {
      email: 'pshirsat.cci@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'localhost:4000',
  schemes: ['http'],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
      description: 'Enter the token with the Bearer: prefix, e.g. "Bearer abcde12345"',
      securityScheme: 'bearerAuth',
    },
  },
  definitions: {
    ValidationResponse: {
      error: 'Not a Valid UUID ',
    },
    QuoteRequestData: {
      quote: 'Education is the most powerful weapon that we can use to change the world.',
      author: 'Nelson Mandela',
      tags: 'life; education;',
    },
    QuotesArrayResponse: [
      {
        quote_id: 'f944af0d-5637-4810-b102-15509cc2c7d8',
        quote: 'Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is most important',
        author: 'Bill Gates',
        likes: 10,
        dislikes: 3,
        tags: 'technology;',
        createdAt: '2023-02-08T07:13:44.194Z',
        updatedAt: '2023-02-08T07:13:44.194Z',
      }],
    QuoteResponse: {
      quote_id: 'eafaf86e-aa92-4fe7-9d10-86add792a80d',
      quote: 'Do not confine your children to your own learning, for they were born in another time.',
      author: 'Chinese Proverb',
      likes: 0,
      dislikes: 0,
      tags: 'life;',
      createdAt: '2023-02-08T07:13:44.194Z',
      updatedAt: '2023-02-08T07:13:44.194Z',
    },
    AuthorResponse: [{ author: 'Pratap Shirsat' }],
    ServerSideError: {
      Error: 'Server side error occured',
    },
    SuccessResponse: {
      message: 'Operation was successfull',
    },
    NotFoundResponse: {
      message: 'Requested data not found',
    },
    UserRequest: {
      user: {
        username: 'pratap',
        password: 'Cci12345',
      },
    },
    UserResponse: {
      username: 'pratap',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 <- some auth token',
    },
    UserData: {
      user: {
        id: 1,
        username: 'pshirsat',
        password_hash: '49409cbd4f9c07369d5a33f9 <- some password hash',
        salt: '0062739612b5135f3ec06d48b9b66cb7',
        createdAt: '2023-02-10T15:46:46.455Z',
        updatedAt: '2023-02-10T15:46:46.455Z',
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

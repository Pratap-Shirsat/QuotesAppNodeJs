# NodeJS - Tutorial

## Quotesv101h - Swagger implementation

> Install swagger packages

```javascript
npm install nodemon --save-dev
npm install swagger-jsdoc swagger-ui-express --save
```

> create a file `swagger.css` in root folder to add custom css for swagger UI, and add below code to it:

```javascript
body {
    background-color: #e0e0e0
}

.swagger-ui .topbar {
    background-color: rgb(65, 26, 238);
}

.swagger-ui .info .base-url {
    font-size: 25px;
}

.swagger-ui .markdown p {
    font-size: 40px;
}

.swagger-ui .btn.execute {
    background-color: green;
}

.swagger-ui button {
    background: orange;
}

.swagger-ui .scheme-container {
    background-color: rgb(238, 176, 61);
}
```

> Now, install following package which we will use to auto generate `swagger.json` file.

```javascript
npm i swagger-autogen
```

> create a file `swagger.js` in root directory and add following code:

```javascript
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
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

```

> To add authentication token handling; add follwing code in `swagger.js` file.

```javascript
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
```

> import swagger files in `app.js` and create a use route:

```javascript
const swaggerUi = require('swagger-ui-express');
const customCss = require('fs').readFileSync((`${process.cwd()}/swagger.css`), 'utf8');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
```

> Add script in `package.json` file:

```javascript
"swagger-autogen": "node ./swagger.js"
```

> [Understanding the usage of schema tags](./swagger-autogen.md)

> After adding swagger code in controllers.

> Run the script `npm run swagger-autogen`. This will create a `swagger.json` file.

> Now run the project with `node app.js` and you can check swagger UI at /api-docs.

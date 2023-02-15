# Understanding of how to use swagger tags

> to add a description and summary and a tag to a API

```js
/* #swagger.description = 'Find quote by quote ID'
    #swagger.summary = 'API to find quote by quote ID'
    #swagger.tags = ['Quotes'] */
```

> to read a path parameter

```js
/* #swagger.parameters['quoteId']={
      description:"Search for the quote by this ID",
      in:"path",
      type:"string"
    } */
```
> to read a query parameter

```js
#swagger.parameters['quote']={
      description: "Search for a quote by the quote substring",
      in: "query",
      type: "string"
    }
```

> to read a body object we can use schema and the schema applied can be defined in `swagger.js` file under `definitions` category.

```js
#swagger.parameters['Quote']={
        description: "Quote data to be updated",
        in: "body",
        schema: {$ref:"#/definitions/QuoteRequestData"}
      }
```

> to read responses

```js
/* #swagger.responses[200]={
        description:"Quote updated successfully",
        schema:{$ref:"#/definitions/SuccessResponse"}
      } */
```

> to use security/authorization then use security schema define from `swagger.js` file like below:

```javascript
/* #swagger.security=[{
        BearerAuth: []
      }] */
```

const { appStatus } = require('../common/constants')();
const quotesService = require('../services/quotes.service')();
const quoteschema = require('./schema/quote.schema');
const userServices = require('../services/user.service');
const interactionService = require('../services/userQuoteInteraction.service');

const getAllQuotes = async (req, res) => {
  try {
    /*
      #swagger.description = 'Find all quotes',
      #swagger.summary = 'API to get all the quotes',
      #swagger.tags = ['Quotes']
    */
    const quotes = await quotesService.getAllQuotes();
    if (quotes) {
      /* #swagger.responses[200]={
          description : 'Fetched all quotes successfully',
          schema: {
          $ref: '#/definitions/QuotesArrayResponse'
          }} */
      return res.status(appStatus.OK).json(quotes);
    }
    /* #swagger.responses[404]={
        description : 'Quotes not found', schema: {$ref:"#/definitions/NotFoundResponse"} } */
    return res.status(appStatus.NOT_FOUND).send({ message: 'No Quotes are created!' });
  } catch (error) {
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const getQuoteById = async (req, res) => {
  try {
    /* #swagger.description = 'Find quote by quote ID'
    #swagger.summary = 'API to find quote by quote ID'
    #swagger.tags = ['Quotes']
    #swagger.parameters['quoteId']={
      description:"Search for the quote by this ID",
      in:"path",
      type:"string"
    } */
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const quotes = await quotesService.getQuoteById(quoteId);
      if (quotes) {
        /* #swagger.responses[200]= {
            description: "Found the quote successfully",
            schema: {
              $ref: "#/definitions/QuoteResponse"
            }} */
        return res.status(appStatus.OK).json(quotes);
      }
      /* #swagger.responses[404]={description:'Quote not found', type:"string"} */
      return res.status(appStatus.NOT_FOUND).send('Quote not found!');
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const addNewQuote = async (req, res) => {
  try {
    /* #swagger.description= "Add a new quote"
      #swagger.summary= "API to create a new quote"
      #swagger.tags = ['Quotes']
      #swagger.security=[{
        BearerAuth: []
      }]
      #swagger.parameters['Quote']={
        description: 'Quote data to create a new quote',
        in: "body",
        schema:{ $ref: "#/definitions/QuoteRequestData"}
      } */
    const { auth: { username } } = req;
    const quote = {
      quote: req.body.quote.trim(),
      author: req.body.author.trim(),
      tags: req.body.tags.trim(),
    };
    const validateRes = quoteschema(quote);
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        /* #swagger.responses[201]={
          description:"Quote created successfully",
          schema:{$ref:"#/definitions/QuoteResponse"}
        } */
        const quoteRes = await quotesService.addQuote({ ...quote, createdByUser: user.id });
        /* #swagger.responses[400]= {
          description: 'validation error',
          schema: {
            $ref: "#/definitions/ValidationResponse"
          }} */
        return res.status(appStatus.CREATED).json(quoteRes);
      }
      /* #swagger.responses[404]= {
          description: 'User validation error',
          schema: {
            $ref: "#/definitions/ValidationResponse"
          }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const updateQuote = async (req, res) => {
  try {
    /* #swagger.description= "Update quote data."
      #swagger.summary= "Update quote data like quote, author or tags searched by quote Id."
      #swagger.tags = ['Quotes']
      #swagger.security=[{
        BearerAuth: []
      }]
      #swagger.parameters['Quote']={
        description: "Quote data to be updated",
        in: "body",
        schema: {$ref:"#/definitions/QuoteRequestData"}
      }
      #swagger.parameters['quoteId']={
        description: "Quote ID to find the Quote to be updated",
        in:"path",
        type:"string"
         } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const quote = {};
    if (req.body.quote) {
      quote.quote = req.body.quote.trim();
    }
    if (req.body.author) {
      quote.author = req.body.author.trim();
    }
    if (req.body.tags) {
      quote.tags = req.body.tags.trim();
    }
    const validateRes = quoteschema({ ...quote, quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser === user.id) {
          await quotesService.updateQuote(quoteId, quote);
          /* #swagger.responses[200]={
            description:"Quote updated successfully",
            schema:{$ref:"#/definitions/SuccessResponse"}
          } */
          return res.status(appStatus.OK).send({ message: 'Quote updated' });
        }
        return res.status(appStatus.BAD_REQUEST).send({ error: 'Only Quote User can edit it!' });
      }
      /* #swagger.responses[404]= {
          description: 'User validation error',
          schema: {
            $ref: "#/definitions/ValidationResponse"
          }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const removeQuote = async (req, res) => {
  try {
    /* #swagger.description="Delete a quote by quote ID"
    #swagger.tags = ['Quotes']
    #swagger.security=[{
        BearerAuth: []
      }]
    #swagger.summary="API to remove a quote by ID"
    #swagger.parameters["quoteId"]={
      description:"Quote ID to find the quote to be deleted",
      required:true,
      in:"path",
      type:"string"
    } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser === user.id) {
          const quotes = await quotesService.removeQuote(quoteId);
          /* #swagger.responses[200]={
            description:"Removed quote successfully",
            schema:{$ref:"#/definitions/SuccessResponse"}
          } */
          return res.status(appStatus.OK).send({
            message:
              quotes === 0 ? 'Quote is already deleted!' : 'Deleted Quote!',
          });
        }
        /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
        return res.status(appStatus.BAD_REQUEST).send({ error: 'Only Quote User can delete it!' });
      }
      /* #swagger.responses[404]= {
          description: 'User validation error',
          schema: {
            $ref: "#/definitions/ValidationResponse"
          }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const searchQuotes = async (req, res) => {
  try {
    /* #swagger.description="Search for a quote by either Author name or quote substring or by tags"
    #swagger.summary="Search a quote by author, quote or by tags"
    #swagger.tags = ['Quotes']
    #swagger.parameters['author']={
      description: "search for quote by author name",
      in: "query",
      type: "string"
    }
    #swagger.parameters['quote']={
      description: "Search for a quote by the quote substring",
      in: "query",
      type: "string"
    }
    #swagger.parameters['tags']={
      description: "Search for quotes by tags",
      in: "query",
      type: "string"
    } */
    const searchQuerry = {};
    if (req.query.author) {
      searchQuerry.author = `%${req.query.author.trim()}%`;
    }
    if (req.query.quote) {
      searchQuerry.quote = req.query.quote.trim();
    }
    if (req.query.tags) {
      searchQuerry.tags = `%${req.query.tags.trim()}`;
    }
    const validateRes = quoteschema(searchQuerry);
    if (validateRes.code) {
      let quotes = null;
      if (searchQuerry.author) {
        quotes = await quotesService.searchQuotesByAuthor(searchQuerry.author);
      } else if (searchQuerry.quote) {
        quotes = await quotesService.searchQuotesByQuote(searchQuerry.quote);
      } else if (searchQuerry.tags) {
        quotes = await quotesService.searchQuotesByTags(searchQuerry.tags);
      }
      if (quotes.length) {
        /* #swagger.responses[200]={
          description: "Found the quotes successfully",
          schema:{ $ref:"#/definitions/QuotesArrayResponse"}
        } */
        return res.status(appStatus.OK).json(quotes);
      }
      /* #swagger.responses[404]={
        description:"Quotes not found",
        schema: {$ref:"#/definitions/NotFoundResponse"}
      } */
      return res.status(appStatus.NOT_FOUND).send({ message: 'Quotes not found!' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const likeUpQuote = async (req, res) => {
  try {
    /* #swagger.description="Like a Quote"
    #swagger.summary="API to increase like count of quote by 1"
    #swagger.tags = ['Quotes']
    #swagger.security=[{
        BearerAuth: []
      }]
    #swagger.parameters['quoteId']={
      description:"Quote ID to find quote",
      in:"path",
      type:"string"
    } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser !== user.id) {
          const interactedData = await interactionService.findUserInteractedQuote(
            quoteData.quote_id,
            user.id,
          );
          if (interactedData) {
            if (interactedData.isLiked) {
              return res.status(appStatus.BAD_REQUEST).send({ error: 'User has already liked this quote!' });
            }
            if (interactedData.isDisLiked) {
              await quotesService.dislikeDownQuote(quoteId);
            }
            await interactionService.updateUserInteractionData(
              user.id,
              quoteData.quote_id,
              true,
              false,
            );
          } else {
            await interactionService.addNewUserInteraction({
              UserId: user.id, QuoteQuoteId: quoteData.quote_id, isLiked: true,
            });
          }
          await quotesService.likeUpQuote(quoteId);

          /* #swagger.responses[200]={
            description:"Operation was successfull",
            schema:{$ref:"#/definitions/SuccessResponse"}
          } */
          return res.status(appStatus.OK).send({ message: 'Incremented the likes count' });
        }
        return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant like his own quote!' });
      }
      /* #swagger.responses[404]= {
           description: 'User validation error',
           schema: {
             $ref: "#/definitions/ValidationResponse"
           }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const likeDownQuote = async (req, res) => {
  try {
    /* #swagger.description="Reduce like count of a Quote"
    #swagger.tags = ['Quotes']
    #swagger.security=[{
        BearerAuth: []
      }]
    #swagger.summary="API to decrease like count of quote by 1"
    #swagger.parameters['quoteId']={
      description:"Quote ID to find quote",
      in:"path",
      type:"string"
    } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser !== user.id) {
          const interactedData = await interactionService.findUserInteractedQuote(
            quoteData.quote_id,
            user.id,
          );
          if (interactedData) {
            if (interactedData.isLiked) {
              await interactionService.updateUserInteractionData(
                user.id,
                quoteData.quote_id,
                false,
                false,
              );

              await quotesService.likeDownQuote(quoteId);
              /* #swagger.responses[200]={
                description:"Operation was successfull",
                schema:{$ref:"#/definitions/SuccessResponse"}
              } */
              return res.status(appStatus.OK).send({ message: 'Decremented the likes count' });
            }
            return res.status(appStatus.BAD_REQUEST).send({ error: 'User has already liked down this quote!' });
          }
          return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant like down this quote, as it was never liked up before!' });
        }
        return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant like down his own quote!' });
      }
      /* #swagger.responses[404]= {
           description: 'User validation error',
           schema: {
             $ref: "#/definitions/ValidationResponse"
           }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const dislikeUpQuote = async (req, res) => {
  try {
    /* #swagger.description="Dislike a Quote"
   #swagger.summary="API to increase dislike count of quote by 1"
   #swagger.tags = ['Quotes']
   #swagger.security=[{
        BearerAuth: []
      }]
   #swagger.parameters['quoteId']={
     description:"Quote ID to find quote",
     in:"path",
     type:"string"
   } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser !== user.id) {
          const interactedData = await interactionService.findUserInteractedQuote(
            quoteData.quote_id,
            user.id,
          );
          if (interactedData) {
            if (interactedData.isDisLiked) {
              return res.status(appStatus.BAD_REQUEST).send({ error: 'User has already disliked this quote!' });
            }
            if (interactedData.isLiked) {
              await quotesService.likeDownQuote(quoteId);
            }
            await interactionService.updateUserInteractionData(
              user.id,
              quoteData.quote_id,
              false,
              true,
            );
          } else {
            await interactionService.addNewUserInteraction({
              UserId: user.id, QuoteQuoteId: quoteData.quote_id, isDisliked: true,
            });
          }
          await quotesService.dislikeUpQuote(quoteId);
          /* #swagger.responses[200]={
            description:"Operation was successfull",
            schema:{$ref:"#/definitions/SuccessResponse"}
          } */
          return res.status(appStatus.OK).send({ message: 'Incremented the dislikes count' });
        }
        return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant dislike his own quote!' });
      }
      /* #swagger.responses[404]= {
           description: 'User validation error',
           schema: {
             $ref: "#/definitions/ValidationResponse"
           }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

const dislikeDownQuote = async (req, res) => {
  try {
    /* #swagger.description="Reduce dislike count of a Quote"
    #swagger.summary="API to decrease dislike count of quote by 1"
    #swagger.tags = ['Quotes']
    #swagger.security=[{
        BearerAuth: []
      }]
    #swagger.parameters['quoteId']={
      description:"Quote ID to find quote",
      in:"path",
      type:"string"
    } */
    const { auth: { username } } = req;
    const { quoteId } = req.params;
    const validateRes = quoteschema({ quoteId });
    if (validateRes.code) {
      const user = await userServices.findUserByUsername(username);
      if (user) {
        const quoteData = await quotesService.getQuoteById(quoteId);
        if (quoteData && quoteData?.createdByUser !== user.id) {
          const interactedData = await interactionService.findUserInteractedQuote(
            quoteData.quote_id,
            user.id,
          );
          if (interactedData) {
            if (interactedData.isDisliked) {
              await interactionService.updateUserInteractionData(
                user.id,
                quoteData.quote_id,
                false,
                false,
              );

              await quotesService.dislikeDownQuote(quoteId);
              /* #swagger.responses[200]={
                description:"Operation was successfull",
                schema:{$ref:"#/definitions/SuccessResponse"}
              } */
              return res.status(appStatus.OK).send({ message: 'Decremented the dislikes count' });
            }
            return res.status(appStatus.BAD_REQUEST).send({ error: 'User has already dislike down this quote!' });
          }
          return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant dislike down this quote, as it was never dislike up before!' });
        }
        return res.status(appStatus.BAD_REQUEST).send({ error: 'User cant dislike down his own quote!' });
      }
      /* #swagger.responses[404]= {
           description: 'User validation error',
           schema: {
             $ref: "#/definitions/ValidationResponse"
           }} */
      return res.status(appStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    /* #swagger.responses[400]= {
        description: 'validation error',
        schema: {
          $ref: "#/definitions/ValidationResponse"
        }} */
    return res.status(appStatus.BAD_REQUEST).send(validateRes.errorMessage);
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

module.exports = {
  getAllQuotes,
  getQuoteById,
  addNewQuote,
  updateQuote,
  removeQuote,
  searchQuotes,
  likeUpQuote,
  likeDownQuote,
  dislikeUpQuote,
  dislikeDownQuote,
};

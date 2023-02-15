const quotesService = require('../services/quotes.service')();
const { appStatus } = require('../common/constants')();

const getAllAuthors = async (req, res) => {
  try {
    /*
    #swagger.tags = ["Authors"]
    #swagger.description = 'Fetch all authors'
    #swagger.summary= "Fetch all authors"
  */
    const authors = await quotesService.getAllAuthors();
    if (authors) {
      /* #swagger.responses[200] = {
      description: "Authors data fetched successfully",
      schema: { $ref: "#/definitions/AuthorResponse"}
    } */
      return res.status(appStatus.OK).json(authors);
    }
    /* #swagger.responses[404] = {
      description: "Authors data not found",
      schema: {$ref:"#/definitions/NotFoundResponse"}
    } */
    return res.status(appStatus.NOT_FOUND).send({ message: 'No Authors found!' });
  } catch (error) {
    /* #swagger.responses[500] = {
      description: "Unknown server side error",
      schema:  { $ref: "#/definitions/ServerSideError" }
    } */
    console.log(`Error in getAllAuthors: ${error}`);
    return res.status(appStatus.SERVER_ERROR).send({ Error: 'Server side error occured' });
  }
};

module.exports = {
  getAllAuthors,
};

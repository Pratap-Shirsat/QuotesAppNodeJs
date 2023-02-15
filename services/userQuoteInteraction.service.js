const db = require('../models/index');
const { Op } = require("sequelize");

const InteractionDb = db.UserQuotesInteractions;

const findUserInteractedQuote = (quoteId, userId) => InteractionDb.findOne({
  where: {
    [Op.and]: [
      { QuoteQuoteId: quoteId },
      { UserId: userId },
    ],
  },
});

const addNewUserInteraction = (userData) => InteractionDb.create(userData);

const updateUserInteractionData = (userId, quoteId, isLiked, isDisliked) => InteractionDb.update({
  isLiked, isDisliked,
}, {
  where: {
    [Op.and]: [{ UserId: userId }, { QuoteQuoteId: quoteId }],
  },
});

module.exports = {
  findUserInteractedQuote,
  addNewUserInteraction,
  updateUserInteractionData,
};

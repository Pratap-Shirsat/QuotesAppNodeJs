const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserQuotesInteractions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserQuotesInteractions.init({
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDisliked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'UserQuotesInteractions',
  });
  return UserQuotesInteractions;
};

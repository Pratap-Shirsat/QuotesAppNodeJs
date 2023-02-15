const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quotes.belongsTo(models.Users, { foreignKey: { name: 'createdByUser' } });
      Quotes.belongsToMany(models.Users, { through: 'UserQuotesInteractions' });
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

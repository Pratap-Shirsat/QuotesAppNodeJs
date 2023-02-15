const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Quotes, { foreignKey: { name: 'createdByUser' } });
      Users.belongsToMany(models.Quotes, { through: 'UserQuotesInteractions' });
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password_hash: DataTypes.TEXT,
    salt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

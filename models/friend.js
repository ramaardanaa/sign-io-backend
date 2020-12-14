'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, {foreignKey: 'owner'})
      Friend.belongsTo(models.User, {foreignKey: 'friend'})
    }
  };
  Friend.init({
    owner: DataTypes.INTEGER,
    friend: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
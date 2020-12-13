'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Member)
      Room.belongsTo(models.User)
    }
  };
  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
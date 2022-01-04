'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wasteowner extends Model {
    static associate(models) {
      // define association here
    }
  };
  wasteowner.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    ID: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wasteowner',
  });
  return wasteowner;
};
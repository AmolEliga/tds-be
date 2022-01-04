'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driver extends Model {
    static associate(models) {
      // define association here
    }
  };
  driver.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'driver',
  });
  return driver;
};
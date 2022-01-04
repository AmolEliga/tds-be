'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  address.init({
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    area: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};
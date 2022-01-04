'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pickuplocation extends Model {
    static associate(models) {
      // define association here
    }
  };
  pickuplocation.init({
    description: DataTypes.STRING,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pickuplocation',
  });
  return pickuplocation;
};
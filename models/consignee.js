'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consignee extends Model {
    static associate(models) {
      // define association here
    }
  };
  consignee.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'consignee',
  });
  return consignee;
};
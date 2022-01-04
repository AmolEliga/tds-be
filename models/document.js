'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    static associate(models) {
      // define association here
    }
  };
  document.init({
    state: DataTypes.STRING,
    driverId: DataTypes.INTEGER,
    wasteOwnerId: DataTypes.INTEGER,
    wasteOwnerType: DataTypes.STRING,
    wasteLocationId: DataTypes.INTEGER,
    consigneeId: DataTypes.INTEGER,
    consigneeType: DataTypes.STRING,
    consigneeLocationId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    pickupLocationId: DataTypes.INTEGER,
    signedBy: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'document',
  });
  return document;
};
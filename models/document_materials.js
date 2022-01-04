'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class documentmaterial extends Model {
    static associate(models) {
      // define association here
    }
  };
  documentmaterial.init({
    documentId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    estimatedWeight: DataTypes.INTEGER,
    actualWeight: DataTypes.INTEGER,
    inspectedBy: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'documentmaterial',
  });
  return documentmaterial;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class material extends Model {
    static associate(models) {
      // define association here
    }
  };
  material.init({
    type: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'material',
  });
  return material;
};
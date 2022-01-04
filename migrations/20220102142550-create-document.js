'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      wasteOwnerId: {
        type: Sequelize.INTEGER
      },
      wasteOwnerType: {
        type: Sequelize.STRING
      },
      wasteLocationId: {
        type: Sequelize.INTEGER
      },
      consigneeId: {
        type: Sequelize.INTEGER
      },
      consigneeType: {
        type: Sequelize.STRING
      },
      consigneeLocationId: {
        type: Sequelize.INTEGER
      },
      materialId: {
        type: Sequelize.INTEGER
      },
      pickupLocationId: {
        type: Sequelize.INTEGER
      },
      signedBy: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      modifiedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('documents');
  }
};
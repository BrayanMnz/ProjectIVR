'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CentroVacunacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_Centro: {
        type: Sequelize.STRING
      },
      descripcion_Centro: {
        type: Sequelize.STRING
      },
      dosis_Disponibles: {
        type: Sequelize.INTEGER
      },
      ultimaCita: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('CentroVacunacions');
  }
};
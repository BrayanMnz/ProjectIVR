'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Personas', {
      id_persona: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dni_persona: {
        type: Sequelize.STRING
      },
      nombreCompleto_persona: {
        type: Sequelize.STRING
      },
      fechaNacimiento_persona: {
        type: Sequelize.STRING
      },
      sexo_persona: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      prioridad: {
        type: Sequelize.DOUBLE
      },
      cita: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Personas');
  }
};
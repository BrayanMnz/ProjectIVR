'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contactos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_contacto: {
        type: Sequelize.STRING
      },
      telefono_contacto: {
        type: Sequelize.STRING
      },
      movil_contacto: {
        type: Sequelize.STRING
      },
      nombreContactoEmergencia: {
        type: Sequelize.STRING
      },
      telefonoContactoEmergencia: {
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
    await queryInterface.dropTable('Contactos');
  }
};
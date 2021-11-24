'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tos: {
        type: Sequelize.STRING
      },
      diarrea: {
        type: Sequelize.STRING
      },
      nausea: {
        type: Sequelize.STRING
      },
      garganta: {
        type: Sequelize.STRING
      },
      secrecionNasal: {
        type: Sequelize.STRING
      },
      respirar: {
        type: Sequelize.STRING
      },
      Fiebre: {
        type: Sequelize.STRING
      },
      hospitalizado: {
        type: Sequelize.STRING
      },
      hospitalNombre: {
        type: Sequelize.STRING
      },
      Uci: {
        type: Sequelize.STRING
      },
      otraEfermedad: {
        type: Sequelize.STRING
      },
      ventilador: {
        type: Sequelize.STRING
      },
      oxigenoEmo: {
        type: Sequelize.STRING
      },
      ayudanteNombre: {
        type: Sequelize.STRING
      },
      relacion: {
        type: Sequelize.STRING
      },
      ayudanteEmail: {
        type: Sequelize.STRING
      },
      ayudanteTelefono: {
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
    await queryInterface.dropTable('Surveys');
  }
};
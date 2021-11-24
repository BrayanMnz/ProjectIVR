'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Survey.init({
    tos: DataTypes.STRING,
    diarrea: DataTypes.STRING,
    nausea: DataTypes.STRING,
    garganta: DataTypes.STRING,
    secrecionNasal: DataTypes.STRING,
    respirar: DataTypes.STRING,
    Fiebre: DataTypes.STRING,
    hospitalizado: DataTypes.STRING,
    hospitalNombre: DataTypes.STRING,
    Uci: DataTypes.STRING,
    otraEfermedad: DataTypes.STRING,
    ventilador: DataTypes.STRING,
    oxigenoEmo: DataTypes.STRING,
    ayudanteNombre: DataTypes.STRING,
    relacion: DataTypes.STRING,
    ayudanteEmail: DataTypes.STRING,
    ayudanteTelefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Afeccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Afeccion.init({
    titulo_affecion: DataTypes.STRING,
    descripcion_afeccion: DataTypes.STRING,
    prioridad_afeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Afeccion',
  });
  return Afeccion;
};
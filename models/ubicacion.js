'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ubicacion.init({
    provincia: DataTypes.STRING,
    municipio: DataTypes.STRING,
    sector: DataTypes.STRING,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CentroVacunacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CentroVacunacion.init({
    nombre_Centro: DataTypes.STRING,
    descripcion_Centro: DataTypes.STRING,
    dosis_Disponibles: DataTypes.INTEGER,
    ultimaCita: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CentroVacunacion',
  });
  return CentroVacunacion;
};
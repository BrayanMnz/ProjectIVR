'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CitaVacunacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CitaVacunacion.init({
    fecha_Cita: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CitaVacunacion',
  });
  return CitaVacunacion;
};
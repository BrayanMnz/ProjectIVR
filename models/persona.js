'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Persona.hasOne(models.Ubicacion);
      Persona.hasOne(models.Contacto);
      Persona.hasOne(models.Formulario);
    }
  };
  Persona.init({
    dni_persona: DataTypes.STRING,
    nombreCompleto_persona: DataTypes.STRING,
    fechaNacimiento_persona: DataTypes.STRING,
    sexo_persona: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    prioridad: DataTypes.DOUBLE,
    cita: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};
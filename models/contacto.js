'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contacto.init({
    email_contacto: DataTypes.STRING,
    telefono_contacto: DataTypes.STRING,
    movil_contacto: DataTypes.STRING,
    nombreContactoEmergencia: DataTypes.STRING,
    telefonoContactoEmergencia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contacto',
  });
  return Contacto;
};
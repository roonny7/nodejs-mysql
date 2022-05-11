const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var CON_Archivos = dbConnection.define("CON_Archivos", {
  Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  NoEmpleado: {
      type: Sequelize.STRING,
      allowNull: false
  },
  IdTipoDocto: {
    type: Sequelize.INTEGER,
    allowNull: false
 },
 FechaDocumento: {
    type: Sequelize.DATE,
    allowNull: false
 },
 Observacion: {
    type: Sequelize.STRING,
    allowNull: false
 },
 Ubicacion: {
    type: Sequelize.INTEGER,
    allowNull: false
 },
 Nombre: {
    type: Sequelize.STRING,
    allowNull: false
 }, 
}, {
  modelName: "CON_Archivos",
  timestamps: false   
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    CON_Archivos
}

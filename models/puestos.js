const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Puestos = dbConnection.define("Puestos", {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field : 'IdPuesto'
  },
  Descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
      field : 'Descripcion'
  },
 
}, {
  modelName: "Puestos",
  timestamps: false ,
  freezeTableName: true
},

);

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    Puestos
}

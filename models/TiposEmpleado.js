const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var TiposEmpleado = dbConnection.define("TiposEmpleado", {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field : 'IdTipo'
  },
  Descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
      field : 'Descripcion'
  },
 
}, {
  modelName: "TiposEmpleado",
  timestamps: false ,
  freezeTableName: true
},

);

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    TiposEmpleado
}

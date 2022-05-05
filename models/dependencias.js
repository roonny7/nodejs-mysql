const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Dependencias = dbConnection.define("Dependencias", {
  IdDependencia: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  Descripcion: {
      type: Sequelize.STRING,
      allowNull: false
  },
  
 
}, {
  modelName: "Dependencias",
  timestamps: false   
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    Dependencias
}

const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Niveles = dbConnection.define("Niveles", {
  IdNivel: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  Nivel: {
      type: Sequelize.STRING,
      allowNull: false,
      field : 'Descripcion'
  },
  
 
}, {
  modelName: "Niveles",
  timestamps: false   
});

// sync model
dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    Niveles
}

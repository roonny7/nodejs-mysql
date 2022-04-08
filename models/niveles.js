const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Niveles = dbConnection.define("Niveles", {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field : 'IdNivel'
  },
  Descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
      field : 'Descripcion'
  },
  
  Nivel: {
    type: Sequelize.STRING,
    allowNull: false,
    field : 'Nivel'
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

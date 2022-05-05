const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var TipoMovimientos = dbConnection.define("TipoMovimientos", {
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
  modelName: "TipoMovimientos",
  timestamps: false ,
  freezeTableName: true
},

);

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    TipoMovimientos
}

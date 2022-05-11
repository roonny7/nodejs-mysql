const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var CON_TipoDocumentos = dbConnection.define("CON_TipoDocumentos", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,   
    field : 'IdTipoDocto'
  },
  Descripcion: {
      type: Sequelize.STRING,
      allowNull: false
  },
  Tipo: {
    type: Sequelize.STRING,
    allowNull: false
},
 
}, {
  modelName: "CON_TipoDocumentos",
  timestamps: false   
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
  CON_TipoDocumentos
}

const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Movimientos = dbConnection.define("Movimientos", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,    
    field : 'IdMovimiento'
},
IdDependencia: {
      type: Sequelize.INTEGER,
      allowNull: false,
      
  },
  IdTipo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    
},
  NoEmpleado: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Alta: {
    type: Sequelize.DATE,
    allowNull: false
},
  Baja: {
    type: Sequelize.DATE,
    allowNull: false
},
}, {
  modelName: "Movimientos",
  timestamps: false,
  freezeTableName : true
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    Movimientos
}

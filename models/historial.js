const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Historial = dbConnection.define("Historial", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    
    field : 'NoEmpleado'
},
IdDependencia: {
      type: Sequelize.INTEGER,
      allowNull: false,
      
  },
  IdTipoEmpleado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    
},
  IdPuesto: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  NoEmpleado: {
    type: Sequelize.STRING,
    allowNull: false
  },
  IdTipoMovimiento: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  IdNivel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references : {
      model : 'Niveles',
      key : 'IdNivel'
    }
  },
  Fecha: {
    type: Sequelize.DATE,
    allowNull: false
},
 
}, {
  modelName: "Dependencias",
  timestamps: false,
  freezeTableName : true
});

// sync model
dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    Historial
}

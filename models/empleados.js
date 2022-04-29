const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Empleados = dbConnection.define("Empleados", {
  NoEmpleado: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,     
  },
  Nombre: {
      type: Sequelize.STRING,
      allowNull: false
  },
  APaterno: {
      type: Sequelize.STRING,
      allowNull: false
  },
  AMaterno: {
      type: Sequelize.STRING,
      allowNull: false
  },
  IdNivel: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  IdDependencia: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Sueldo: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, 
  IdDependencia: {
    type: Sequelize.INTEGER,
    allowNull: false
  },  
  Puesto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  CURP: {
    type: Sequelize.STRING,
    allowNull: false
  },
  RFC: {
    type: Sequelize.STRING,
    allowNull: false
  },  
}, {
  modelName: "Empleados",
  timestamps: false   
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
  Empleados,
}

/*
module.exports = (sequelize) => {
    const Usuario = dbConnection.define("Usuarios", {
      Usuario: {
        type: Sequelize.STRING
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Tipo: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      timestamps : false
    });
    
    return Usuario;
  };*/
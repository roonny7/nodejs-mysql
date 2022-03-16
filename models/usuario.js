const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var Usuarios = dbConnection.define("Usuarios", {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field : 'IdUsuario'

  },
  Nombre: {
      type: Sequelize.STRING,
      allowNull: false
  },
  Password: {
      type: Sequelize.STRING,
      allowNull: false
  },
  Usuario: {
      type: Sequelize.STRING,
      allowNull: false
  },
  Tipo: {
    type: Sequelize.STRING,
    allowNull: false
},
 
}, {
  modelName: "Usuarios",
  timestamps: false   
});

// sync model
dbConnection.sync();
//console.log("aqui está");

module.exports = { 
  Usuarios
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
const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

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
  };
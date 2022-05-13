const { Sequelize }  = require('sequelize');
const { dbConnection }  = require('../database/config');

var NOM_ImpuestoMensual2021 = dbConnection.define("NOM_ImpuestoMensual2021", {
  Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field : "IdImpuestoMensual"
  },
  LimiteInferior: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('LimiteInferior').parseInt();
      }
  },
  LimiteSuperior: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
        return this.getDataValue('LimiteSuperior').parseInt();
      }
 },
 CuotaFija: {
    type: Sequelize.STRING,
    allowNull: false
 },
 PorcentajeLI: {
    type: Sequelize.STRING,
    allowNull: false
 },
  
}, {
  modelName: "NOM_ImpuestoMensual2021",
  timestamps: false,
  freezeTableName : true
});

// sync model
//dbConnection.sync();
//console.log("aqui está");

module.exports = { 
    NOM_ImpuestoMensual2021
}

const Sequelize  = require('sequelize');

const dbConnection = new Sequelize('sistema_rh', 'root', '22', {
    host : 'localhost',
    dialect : 'mysql',
    //logging : false,
});

module.exports = {
    dbConnection
}
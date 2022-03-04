const Sequelize  = require('sequelize');

const dbConnection = new Sequelize('sistema_rh', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',
    //logging : false,
});

module.exports = {
    dbConnection
}




      /*  var Usuarios = dbConnection.define("Usuarios", {
            IdUsuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
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

           
        }, {
            modelName: "Usuarios",
            timestamps: false   
        });
        
        // sync model
        dbConnection.sync();

    Usuarios.findAll({  where: [{IdUsuario: '1'}, {Usuario : 'admin'}] }).
    then((data) => {

        console.log(data);
          }).catch((error) => {
           //.. error
          });

*/

/*dbConnection.authenticate()
        .then(() => {
            console.log('Connection establecida.');
        })
        .catch(err => {
            console.error('No se pudo conectar:', err);
        });

*/
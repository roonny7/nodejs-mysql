const express = require('express');
var cors = require('cors');
const Sequelize  = require('sequelize');


const  { dbConnection }   = require('../database/config');
//console.log("carajos", dbConnection);


class Server {

    constructor(){
        this.app = express();
        this.port= 4000;
        
        this.paths = {
            categories : '/api/categorias',
            productos  : '/api/productos',
            buscar : '/api/usuarios/buscar',
            uploads : '/api/uploads'
        }
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conectar a la base de datos
        this.conectarDB();

        //middlewares
        //middlewares. funciones que siempre se van a ejecutar cuando iniciemos el servidor
        this.middlewares();

        //rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
       const conexionBD = await dbConnection.authenticate()
       .then(() => { console.log("ya se conectó ")});

       
       //console.log('aqui está');
        /*const dbConnection = new Sequelize('sistema_rh', 'root', '', {
            host : 'localhost',
            dialect : 'mysql',
            //logging : false,
        });*/
        //console.log(dbConnection);

        /*conexionBD.authenticate()
        .then(() => {
            console.log('Connection establecida.');
        })
        .catch(err => {
            console.error('No se pudo conectar:', err);
        });*/
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //lectura y parseo del body, que venga de put, post, delete
        this.app.use(express.json());

       //directorio público
        this.app.use(express.static('public'));

               

    }

    routes() {

        this.app.get('/',  (req, res) => {
            res.send('Hello World')
          })
          
          
          this.app.use(this.paths.buscar, require('../routes/buscar'));

          /*this.app.use(this.authPath, require('../routes/auth'));
          this.app.use(this.paths.buscar, require('../routes/buscar'));
          this.app.use(this.paths.categories, require('../routes/categorias'));
          this.app.use(this.usuariosPath, require('../routes/usuarios'));
          this.app.use(this.paths.productos, require('../routes/productos'));
          this.app.use(this.paths.uploads, require('../routes/uploads'));
        */
        
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en ', this.port);
        })
    }

}


module.exports = Server;
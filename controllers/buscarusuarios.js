const { response, request } = require("express");
const  { Usuarios }  = require("../models/usuario");
const  { Empleados }  = require("../models/empleados");
const Sequelize  = require('sequelize');

const Op  = Sequelize.Op;
//console.log(Op);
//console.log("vale",Usuarios);


const buscarusuarios = async(req, res= response) =>  {
      
    
    //console.log(Usuario);
        const usuarios = await Usuarios.findAll({
            where: { Estado : '0' }  ///condiciones sql. AND.
        
        });    
    

    /*res.status(200).json({
        data : usuarios
    })*/
    /*response.writeHead(200, {
        'Content-Length': 80,
        'Content-Type': 'text/plain' });*/
        res.setHeader('Content-Range', 'posts 10-20/40');
        res.send(JSON.stringify(usuarios));
}

const buscarusuariosnombre = async(req=request , res= response) =>  {
    //console.log(req);
    
    const { nombre = '' }  = req.query;
    
    //si llegó el nombre
    let whereNombre = { Usuario : {
         [Op.like]: `%${ nombre}%`
        },
    }
    
    //si llegó el tipo 
    let whereTipo = { Tipo : {
        [Op.like]: `%A%`
       }
   }

   //unir condiciones
   let condicionesWhere = { ...whereNombre, ...whereTipo}

    /*const usuarios = await Usuarios.findAll({  
        where: condicionesWhere,
        attributes : [  /// para mostrar sólo los campos que están aqui 
            'Tipo', 'Usuario', 'Nombre', 'IdUbicacion', 
            ['IdUsuario', 'Id'], // IdUsuario AS Id
           // [Sequelize.fn('COUNT', Sequelize.col('IdUsuario')), 'Total'],
        ]
    
    });    */

    const usuarios = await Usuarios.findAll({  
        where: {
            [Op.and]: [
                {'IdUsuario': '1'}, {'Usuario' : 'admin'}, 
                {
                  [Op.or]: [
                      {'IdUbicacion' : 1},
                      {'IdUbicacion' : 2},
                      {'IdUbicacion' : 3},                    
                 ]
                }
              ]
          },
        attributes : [  /// para mostrar sólo los campos que están aqui 
            'Tipo', 'Usuario', 'Nombre', 'IdUbicacion', 
            ['IdUsuario', 'Id'], // IdUsuario AS Id
           // [Sequelize.fn('COUNT', Sequelize.col('IdUsuario')), 'Total'],
        ]
    
    });    

                /*[Op.and]: {
                'IdUsuario': '1',
                'Usuario' : 'admin',
                [Op.or]: [{ 'IdUbicacion' : 1} , {'IdUbicacion' : 2} , {'IdUbicacion' : 3}],
            }*/


   /* 
    where: {
        [Op.and]: [
          {
            A
          },
          {
            B
          },
          {
            [Op.or]: [{
              C,
              D,
              E,
              F
           }]
          }
        ]
      }*/
    /*res.status(200).json(  
        usuarios
    )*/

    res.setHeader('Content-Range', 'posts 10-20/40');
        res.send(JSON.stringify(usuarios));
}


module.exports = {

    buscarusuarios, buscarusuariosnombre
}
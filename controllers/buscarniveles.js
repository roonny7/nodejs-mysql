const { response, request } = require("express");
const  { Niveles }  = require("../models/niveles");

const Sequelize  = require('sequelize');
const Op  = Sequelize.Op;

const buscarniveles = async(req, res= response) =>  {
      
    let { filter = '', sort='' }   = req.query;
    console.log(filter);
    let filtro = JSON.parse(filter);
    sort = JSON.parse(sort);
    let { q='' } = filtro;
    console.log(sort);

    

    const niveles = await Niveles.findAll({
        where: {
            [Op.or] : 
            {
                Nivel : {
                    [Op.like]: `${q}%` 
                },
                Descripcion : {
                    [Op.like]: `%${q}%` 
                },

            }
          },
          order : [
            sort

          ]

    
    });    

    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(niveles));
}


const crearniveles = async (req = request, res = response) => {
    
    const datosNuevos = req.body;
    datosNuevos.Estado='1';

    console.log(datosNuevos);
    const crearNivel = await Niveles.create(
        datosNuevos,       
    );

    console.log(crearNivel);
   

    res.send(JSON.stringify(crearNivel));

}

const actualizarnivelid = async (req = request, res = response) => {
    const datosNuevos = req.body;
    const { id } = datosNuevos;

    const nivelActualizado = await Niveles.update(
        datosNuevos,
        {
            where : { IdNivel : id }
        }
    );
    console.log(nivelActualizado);

    const nivel = await Niveles.findByPk(id);
    
    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(nivel));

    
}

const borrarNivel = async(req=request , res= response) =>  {
    //console.log(req.params);
    const { id:IdNivel = '' }  = req.params;
    
    const nivel = await Niveles.destroy({
        where : {
            IdNivel : IdNivel
        }
    });    

    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(nivel));
}


const buscarnivelid = async(req=request , res= response) =>  {
    //console.log(req.params);
    const { id:IdNivel = '' }  = req.params;
    
    const nivel = await Niveles.findByPk(IdNivel);    

    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(nivel));
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

    buscarniveles, buscarnivelid, actualizarnivelid, crearniveles, borrarNivel
}
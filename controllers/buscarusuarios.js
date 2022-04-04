const { response, request } = require("express");
const  { Usuarios }  = require("../models/usuario");
const  { Empleados }  = require("../models/empleados");
const Sequelize  = require('sequelize');

const Op  = Sequelize.Op;
//console.log(Op);
//console.log("vale",Usuarios);
const crearusuarios = async (req = request, res = response) => {
    
    const datosNuevos = req.body;
    let tipo = datosNuevos.Tipo;
    tipo = tipo[0];

    datosNuevos.Tipo=tipo;

    console.log(datosNuevos);
    const crearusuario = await Usuarios.create(
        datosNuevos,       
    );

    console.log(crearusuario);
   

    res.send(JSON.stringify(crearusuario));

}

const actualizarusuarioid = async (req = request, res = response) => {
    const datosNuevos = req.body;
    const { id } = datosNuevos;

    const usuarioActualizado = await Usuarios.update(
        datosNuevos,
        {
            where : { IdUsuario : id }
        }
    );

    const usuario = await Usuarios.findByPk(id);
    
    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(usuario));

    
}

const borrarusuarioid = async(req=request , res= response) =>  {
    //console.log(req.params);
    const { id:idUsuario = '' }  = req.params;
    
    const usuario = await Usuarios.destroy({
        where : {
            IdUsuario : idUsuario
        }
    });    

    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(usuario));
}


const buscarusuariosid = async(req=request , res= response) =>  {
    //console.log(req.params);
    const { id:idUsuario = '' }  = req.params;
    
    const usuario = await Usuarios.findByPk(idUsuario);    

    res.setHeader('Content-Range', 'posts 10-20/40');
    res.send(JSON.stringify(usuario));
}


const buscarusuarios = async(req, res= response) =>  {
      
        let { filter = {}, sort='Nombre' }  = req.query;
        //if (filter=='{}')  filter = '';
        let filtro = filter;
        filtro = filtro.substring(6,100);  
        filtro = filtro.slice(0,-2);  

        let vectorOrden = sort.split(',');
        let campoOrden = vectorOrden[0];
        let orden = vectorOrden[1];

        campoOrden = campoOrden.slice(2,50);
        campoOrden = campoOrden.slice(0,-1);

        orden = orden.slice(0,-2);
        orden = orden.slice(1,50);



        //console.log(req.query);
        //console.log(orden);
        let orden2 = req.query.sort;
        orden2= orden2.replace("'","");
        //console.log(orden2);


        //console.log(filtro, req.query);

        //console.log(order);

        //si llegó el nombre
        let whereNombre = { Nombre : {
                [Op.like]: `%${filtro}%`
            },
        }

        //console.log(whereNombre);
        //orden =   `['${campoOrden}', '${orden}']`;

        //console.log(orden);
    
        const usuarios = await Usuarios.findAll({
            where: { 
                [Op.and]: [
                    { 'Estado' : '1'},
                    { ...whereNombre}
                ]
                                ///... whereNombre 
            },
            order :[ [`${campoOrden}`, `${orden}`]
                 
            ]

        
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

    buscarusuarios, buscarusuariosnombre, crearusuarios, buscarusuariosid, actualizarusuarioid, borrarusuarioid
}
const { response, request } = require("express");
const  { Empleados }  = require("../models/empleados");
const  { Dependencias }  = require("../models/dependencias");
const  { Niveles }  = require("../models/niveles");
console.log(Dependencias);
const Sequelize  = require('sequelize');

const Op  = Sequelize.Op;


const buscarempleados = async(req = request, res= response) =>  {
       
    const { nombre = '', paterno = '', materno='', noempleado:urlnoempleado=0, inicio=0, fin=50 }  = req.query;
    //console.log("valw", urlnoempleado);
    let noempleado = urlnoempleado.padStart(5, '0'); //00099
    
    
    
    //si llegó el nombre
    let whereNombre = { 
        [Op.or] : {
            Nombre : { 
                [Op.like]: `%${ nombre}%` 
            }, 
            APaterno : { 
                [Op.like]: `%${ paterno}%` 
            }, 
            AMaterno : {
                [Op.like]: `%${ materno}%` 
            }
        }
    }

    let whereNoEmpleado = '';
    console.log("vale", noempleado);
    (noempleado!=00000) ? whereNoEmpleado = { NoEmpleado : noempleado } : whereNoEmpleado='';
    
    
   //unir condiciones
   let condicionesWhere = { ...whereNombre, ...whereNoEmpleado}


   Empleados.belongsTo(Dependencias, {foreignKey: 'IdDependencia'});
   Dependencias.hasOne(Empleados, {foreignKey : 'IdDependencia', targetKey : 'IdDependencia'} );

   
   const datosextras = {
       azul : 1,
       verde : 1,
   }


   const empleados = await Empleados.findAll({  
    where: condicionesWhere ,
    include : [{ model : Dependencias, required : true}],
    offset : Number(inicio),
    limit : Number(fin),
    order : [
        ['APaterno'], ['AMaterno'], ['Nombre'], 
    ]
    
    

}); 
    const rowEmpleado=empleados;
    let nivel;
    nivel = (rowEmpleado[0].IdNivel);
    
    if (nivel){
        nivel = await Niveles.findByPk(nivel,{ raw: true});
    }
    nivel = JSON.stringify(nivel);
    nivel = JSON.parse(nivel);

    empleados.push(nivel);

    res.status(200).json({
        msg : `El resultado de la consulta es : `,
        empleados
    })
}
/*
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

                
    res.status(418).json({
        msg : `Las colecciones permitidas son : `,
        usuarios
    })
}

*/
module.exports = {

    buscarempleados
}
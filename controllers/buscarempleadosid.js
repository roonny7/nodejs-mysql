const { response, request } = require("express");
const  { Empleados }  = require("../models/empleados");
const  { Dependencias }  = require("../models/dependencias");
const  { Niveles }  = require("../models/niveles");
const Sequelize  = require('sequelize');
const { TiposEmpleado } = require("../models/TiposEmpleado");

const Op  = Sequelize.Op;

const buscarempleadosid = async(req = request, res= response) =>  {
       
    const { id:NoEmpleado = '' }  = req.params;

    console.log(req.query);
       
    
    (NoEmpleado!=00000) ? whereNoEmpleado = { NoEmpleado : NoEmpleado } : whereNoEmpleado='';
    
    
   //unir condiciones
   let condicionesWhere = {...whereNoEmpleado}


   Empleados.belongsTo(Dependencias, {foreignKey: 'IdDependencia'});
   Empleados.belongsTo(Niveles, {foreignKey: 'IdNivel'});
   Empleados.belongsTo(TiposEmpleado, {foreignKey: 'TipoEmp'});

   Dependencias.hasOne(Empleados, {foreignKey : 'IdDependencia', targetKey : 'IdDependencia'} );
   Niveles.hasOne(Empleados, {foreignKey : 'IdNivel', targetKey : 'IdNivel'} );
   TiposEmpleado.hasOne(Empleados, {foreignKey : 'TipoEmp', targetKey : 'IdTipoEmpleado'} );

   
   const datosextras = {
       azul : 1,
       verde : 1,
   }


   const empleados = await Empleados.findAll({  
    where: condicionesWhere ,
    include : [{ model : Dependencias, required : true}, { model : Niveles, required : true}, { model : TiposEmpleado, required : true}],
    
    
    

}); 
    /*const rowEmpleado=empleados;
    let nivel;
    nivel = (rowEmpleado[0].IdNivel);
    
    if (nivel){
        nivel = await Niveles.findByPk(nivel,{ raw: true});
    }
    nivel = JSON.stringify(nivel);
    nivel = JSON.parse(nivel);

    empleados.push(nivel);*/

    res.status(200).json({
       // msg : `El resultado de la consulta es : `,
        empleados
    })
}
/*


*/
module.exports = {

    buscarempleadosid
}
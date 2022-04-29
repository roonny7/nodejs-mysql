const { response, request } = require("express");
const  { Empleados }  = require("../models/empleados");
const  { Dependencias }  = require("../models/dependencias");
const  { Niveles }  = require("../models/niveles");
const Sequelize  = require('sequelize');
const { TiposEmpleado } = require("../models/TiposEmpleado");
const { Historial } = require("../models/historial");
const { Puestos } = require("../models/puestos");


const Op  = Sequelize.Op;

const buscarhistorial = async(req = request, res= response) =>  {
     
    let NoEmpleado='14455';
    (NoEmpleado) ? whereNoEmpleado = { NoEmpleado : NoEmpleado } : whereNoEmpleado={ NoEmpleado : '00000' };
    
    let condicionesWhere = {...whereNoEmpleado}


   Historial.belongsTo(Niveles, {foreignKey: 'IdNivel'});
   Niveles.hasOne(Historial, {foreignKey : 'IdNivel', targetKey : 'IdNivel'} );
   
   Historial.belongsTo(TiposEmpleado, {foreignKey: 'IdTipoEmpleado'});
   TiposEmpleado.hasOne(Historial, {foreignKey : 'IdTipoEmpleado', targetKey : 'IdTipoEmpleado'} );

   Historial.belongsTo(Dependencias, {foreignKey: 'IdDependencia'});
   Dependencias.hasOne(Historial, {foreignKey : 'IdDependencia', targetKey : 'IdDependencia'} );
   
   Historial.belongsTo(Puestos, {foreignKey: 'IdPuesto'});
   Puestos.hasOne(Historial, {foreignKey : 'IdPuesto', targetKey : 'IdPuesto'} );
   
   /*Empleados.belongsTo(Niveles, {foreignKey: 'IdNivel'});
   Empleados.belongsTo(TiposEmpleado, {foreignKey: 'TipoEmp'});

   
   Niveles.hasOne(Empleados, {foreignKey : 'IdNivel', targetKey : 'IdNivel'} );
   TiposEmpleado.hasOne(Empleados, {foreignKey : 'TipoEmp', targetKey : 'IdTipoEmpleado'} );
*/
   
  


   const historial = await Historial.findAll({  
    where: condicionesWhere ,
    include : [{ model : Niveles, required : true}, { model : TiposEmpleado, required : true}, { model : Dependencias, required : true},
        { model : Puestos, required : true}],
    order : [ ['Fecha', 'ASC']]
    //include : [{ model : Dependencias, required : true}, { model : Niveles, required : true}, { model : TiposEmpleado, required : true}],

}); 

   
res.status(200).json({
    // msg : `El resultado de la consulta es : `,
    resHistorial : historial
 })

    /*const rowEmpleado=empleados;
    let nivel;
    nivel = (rowEmpleado[0].IdNivel);
    
    if (nivel){
        nivel = await Niveles.findByPk(nivel,{ raw: true});
    }
    nivel = JSON.stringify(nivel);
    nivel = JSON.parse(nivel);

    empleados.push(nivel);*/


}
/*


*/
module.exports = {

    buscarhistorial
}
const { response, request } = require("express");
const Sequelize  = require('sequelize');

const { Dependencias }  = require("../models/dependencias");
const { TiposEmpleado } = require("../models/TiposEmpleado");
const { Movimientos } = require("../models/movimientos");


const Op  = Sequelize.Op;

const buscarmovimientos = async(req = request, res= response) =>  {
     
    const { id:NoEmpleado }  = req.params;
    console.log(req.params);
    
    console.log(NoEmpleado);
    (NoEmpleado) ? whereNoEmpleado = { NoEmpleado : NoEmpleado } : whereNoEmpleado={ NoEmpleado : '00000' };
    
    let condicionesWhere = {...whereNoEmpleado}


   Movimientos.belongsTo(TiposEmpleado, {foreignKey: 'IdTipo'});
   TiposEmpleado.hasOne(Movimientos, {foreignKey : 'IdTipo', targetKey : 'IdTipo'} );

   Movimientos.belongsTo(Dependencias, {foreignKey: 'IdDependencia'});
   Dependencias.hasOne(Movimientos, {foreignKey : 'IdDependencia', targetKey : 'IdDependencia'} );
  


   const movimientos = await Movimientos.findAll({  
    where: condicionesWhere ,
    include : [{ model : TiposEmpleado, required : true}, { model : Dependencias, required : true}],
    order : [ ['Alta', 'ASC']]

}); 
let esArreglo = Array.isArray(movimientos);
//console.log(esArreglo);
console.log("tiene la cantidad de ", movimientos.length);
//console.log("ahora el valor que tiene es ",movimientos[0].dataValues);

let yourDate = new Date()
const offset = yourDate.getTimezoneOffset();
yourDate = new Date(yourDate.getTime() - (offset*60*1000));
let fechaActual=yourDate.toISOString().split('T')[0];
let vfechaActual;

vfechaActual = fechaActual.split('-');
fechaActual=vfechaActual[2]+'/'+vfechaActual[1]+'/'+vfechaActual[0];

console.log(fechaActual);
let datosVector={}; let fecha1='', fecha2 ='', calculodias ='', vfecha1='', vfecha2='', fechaform1='', fechaform2 =''; 



let diasLaboralesCompletos=0;


let nuevoRegreso = movimientos.map(function(Row) {
    vfecha1=Row.Alta.split('-');
    fecha1=vfecha1[2]+'/'+vfecha1[1]+'/'+vfecha1[0];
    fechaform1=vfecha1[0]+','+vfecha1[1]+','+vfecha1[2];


    fecha2=Row.Baja;
    if (Row.Baja=='0000-00-00')  { fecha2 =fechaActual; fechaform2=vfechaActual[0]+','+vfechaActual[1]+','+vfechaActual[2]; }
    else
    {
        vfecha2=fecha2.split('-');
        fecha2=vfecha2[2]+'/'+vfecha2[1]+'/'+vfecha2[0];
        fechaform2=vfecha2[0]+','+vfecha2[1]+','+vfecha2[2];
    }
       
    //console.log(fecha1, fecha2, dias, fechaform1, fechaform2);
    
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(fechaform1);
    let secondDate = new Date(fechaform2);

    calculodias = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    let dias = calculodias;
    diasLaboralesCompletos+=calculodias;
    
    
     
    let anios = Math.floor(dias/365);
    dias = dias - (anios*365);
    let meses = Math.floor(dias/30.4);
    dias = dias - Math.floor(meses*30.4);

    let antiguedad ='';
    if (anios) antiguedad=`${anios} Años (s),  `;
    if (meses) antiguedad+=`${meses} meses (s), y `;
    if (dias) antiguedad+=`${dias} día (s), `;

    datosVector = {
        "diastotales" : calculodias,
        "alta" : Row.Alta,
        "baja" : Row.Baja,
        "Dependencia" : Row.Dependencia.Descripcion,
        "Tipo" : Row.TiposEmpleado.Descripcion,
        anios,
        meses,
        dias,
        antiguedad,
        "total" : diasLaboralesCompletos

        
    }


    return datosVector;
});


    let aniosT = Math.floor(diasLaboralesCompletos/365);
    diasLaboralesCompletos = diasLaboralesCompletos - (aniosT*365);
    let mesesT = Math.floor(diasLaboralesCompletos/30.4);
    diasLaboralesCompletos = diasLaboralesCompletos - Math.floor(mesesT*30.4);

    let antiguedadT ='', diasT='' ;
    if (aniosT) antiguedadT=`${aniosT} Años (s),  `;
    if (mesesT) antiguedadT+=`${mesesT} meses (s), y `;
    if (diasLaboralesCompletos) antiguedadT+=`${diasLaboralesCompletos} día (s), `;

    let ultimoObjeto = {
        "dias totales" : diasLaboralesCompletos,
        "antiguedadTotal" : antiguedadT
    }
    
nuevoRegreso.push(ultimoObjeto)

//console.log("nuevo regreso vale ahora :", nuevoRegreso);


res.status(200).json({
    nuevoRegreso    
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

    buscarmovimientos
}
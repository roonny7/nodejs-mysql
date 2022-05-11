const { response, request } = require("express");
const Sequelize  = require('sequelize');

const { CON_TipoDocumentos }  = require("../models/con_tipodocumentos");
const { CON_Archivos } = require ("../models/con_archivos");

const Op  = Sequelize.Op;

const buscarexpedientes = async(req = request, res= response) =>  {
     
    const { id:NoEmpleado, tipo=1 }  = req.params;
    console.log(req.params);
    
    
    (NoEmpleado) ? whereNoEmpleado = { NoEmpleado : NoEmpleado } : whereNoEmpleado={ NoEmpleado : '00000' };

    CON_Archivos.belongsTo(CON_TipoDocumentos, {foreignKey: 'IdTipoDocto'});
    CON_TipoDocumentos.hasOne(CON_Archivos, {foreignKey : 'IdTipoDocto', targetKey : 'IdTipo'} );


   const expedientes = await CON_Archivos.findAll({  
    where: {
        [Op.and]: [
          { '$CON_TipoDocumento.Tipo$': tipo },
          whereNoEmpleado
        ]
    },
    include : [{ model : CON_TipoDocumentos, required : true}],
    order : [ ['FechaDocumento', 'ASC']]

}); 


let datosVector;
let nuevoRegreso = expedientes.map(function(Row) {
    
    let L='0';
    if (tipo==1) L='1' 
    let url =`https://tramitesrh.qroo.gob.mx/sistema/Expedientes/Archivo.php?L=${L}&Id=${Row.Id}&NoEmpleado=${NoEmpleado}`;

    let fecha='-';
    //console.log(Row.FechaDocumento);
    if (Row.FechaDocumento!=='0000-00-00') fecha = Row.FechaDocumento;
    datosVector = {       
        "fechadocumento" : fecha,
        "observacion" : Row.Observacion,
        "Descripcion" : Row.CON_TipoDocumento.Descripcion,
        "Id" : Row.Id,
        "url" : url
        
        
    }

    return datosVector;
});



res.status(200).json({
    nuevoRegreso
 })

}

module.exports = {

    buscarexpedientes
}
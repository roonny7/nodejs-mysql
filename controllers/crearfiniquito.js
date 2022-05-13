const { response, request } = require("express");
const Sequelize  = require('sequelize');
const { NOM_ImpuestoMensual2021 } = require("../models/NOM_Impuestos");
const { dbConnection } = require ('../database/config');


var formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

const Op  = Sequelize.Op;

const crearfiniquito = async(req = request, res= response) =>  {

    const body = req.body;
    const SalarioMinimoB=96.22;
    const IDiasAguinaldo = 47;
        
    let TotalQuincenal= Number(body.Sueldo)+Number(body.Consifid)+Number(body.ApoyoVivienda)+Number(body.CanastaBasica)+Number(body.AyudaDespensa)+Number(body.AyudaTransporte)+Number(body.Quinquenio)+Number(body.CompServicio)+Number(body.CompBase)+Number(body.VidaCara)+Number(body.EstimuloEspecial)+Number(body.Compensacion)+Number(body.RiesgoDes)+Number(body.VCCanastaBasica);
    let SueldoDiario=(TotalQuincenal-body.Compensacion)/15;
    SueldoDiario = SueldoDiario.toFixed(2);
    let SueldoDiarioAgui=TotalQuincenal/15;
    SueldoDiarioAgui = SueldoDiarioAgui.toFixed(2);


    let DiasPrima1 = Number(body.DiasEne)+Number(body.DiasFeb)+Number(body.DiasMar)+Number(body.DiasAbr)+Number(body.DiasMay)+Number(body.DiasJun);
    let DiasPrima2 = Number(body.DiasJul)+Number(body.DiasAgo)+Number(body.DiasSep)+Number(body.DiasOct)+Number(body.DiasNov)+Number(body.DiasDic);

    let DiasAguinaldo=DiasPrima1+DiasPrima2;

    let AguinaldoAnual=SalarioMinimoB * 30;
    let PrimaAnual = SalarioMinimoB*15;

    let FactorAguinaldo=(((DiasAguinaldo*IDiasAguinaldo)/365)).toFixed(2);
    let ImporteAguinaldo= (FactorAguinaldo * SueldoDiarioAgui).toFixed(2);
    //ImporteAguinaldo  = formatter.format(ImporteAguinaldo);

    /*let Idusuario=1;
    let consulta="select * from NOM_ImpuestoMensual2021 WHERE CAST(LimiteInferior AS DECIMAL)<='15770.12' AND CAST(LimiteSuperior AS DECIMAL)>='15770.12'";
    let usuarios = await dbConnection.query(consulta);
    console.log(usuarios);*/

    //dbConnection.cast()
    const TablaImpuestos = await NOM_ImpuestoMensual2021.findAll({  
        where:  {
            LimiteInferior : {
                [Op.lte] : ImporteAguinaldo
            },
            LimiteSuperior : {
                [Op.gte] : ImporteAguinaldo
            },
            
                

        }
        
    
    }); 

    
    
    


let Resultado = {
    TotalQuincenal, 
    SueldoDiario,
    SueldoDiarioAgui,
    DiasPrima1,
    DiasPrima2,
    DiasAguinaldo,
    AguinaldoAnual,
    PrimaAnual, 
    FactorAguinaldo,
    ImporteAguinaldo

}

//console.log(Resultado);
res.status(200).json({
    Resultado
 })
}



module.exports = {

    crearfiniquito
}
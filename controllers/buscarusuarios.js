const { response, request } = require("express");
const  { Usuarios }  = require("../models/usuario");
const Sequelize  = require('sequelize');

const Op  = Sequelize.Op;
console.log(Op);
//console.log("vale",Usuarios);


const buscarusuarios = async(req, res= response) =>  {
    
    //console.log(Usuario);
        const usuarios = await Usuarios.findAll({ Tipo: 'A'});    
    

    res.status(418).json({
        msg : `Las colecciones permitidas son : `,
        usuarios
    })
}

const buscarusuariosnombre = async(req=request , res= response) =>  {
    console.log(req);
    
    const { nombre = '' }  = req.query;
    
    const usuarios = await Usuarios.findAll({  
        where: {
            Usuario : {
                [Op.like]: `%${ nombre}%`
            }
        }
    
    });    
    

    res.status(418).json({
        msg : `Las colecciones permitidas son : `,
        usuarios
    })
}


module.exports = {

    buscarusuarios, buscarusuariosnombre
}
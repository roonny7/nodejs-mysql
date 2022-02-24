const { response } = require("express");
const  Usuario  = require("../models/usuario");
//const  Usuario  = require("../database/config");
console.log("vale",Usuario);


const buscarusuarios = async(req, res= response) =>  {
    
    //console.log(Usuario);
    //const usuarios = await Usuario.findAll();

    res.status(418).json({
        msg : `Las colecciones permitidas son : `,
        //usuarios
    })
}

module.exports = {

    buscarusuarios
}
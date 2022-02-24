const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarusuarios } = require('../controllers/buscarusuarios')
const router = Router();

router.get('/',  buscarusuarios)


module.exports = router;
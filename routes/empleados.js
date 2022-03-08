const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarempleados } = require('../controllers/buscarempleados')
const router = Router();

router.get('/buscar',  buscarempleados);
//router.get('/:nombre',  buscarusuariosnombre)




module.exports = router;
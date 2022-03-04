const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarusuarios, buscarusuariosnombre } = require('../controllers/buscarusuarios')
const router = Router();

router.get('/',  buscarusuarios);
router.get('/:nombre',  buscarusuariosnombre)




module.exports = router;
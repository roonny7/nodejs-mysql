const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarusuarios, buscarusuariosnombre, crearusuarios, buscarusuariosid, actualizarusuarioid } = require('../controllers/buscarusuarios')
const router = Router();

router.get('/users/',  buscarusuarios);
router.post('/users/',  crearusuarios);
router.get('/users/:id',  buscarusuariosid)
router.put('/users/:id',  actualizarusuarioid)




module.exports = router;
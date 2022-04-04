const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarusuarios, borrarusuarioid, crearusuarios, buscarusuariosid, actualizarusuarioid } = require('../controllers/buscarusuarios')
const router = Router();

router.get('/users/',  buscarusuarios);
router.post('/users/',  crearusuarios);
router.get('/users/:id',  buscarusuariosid)
router.put('/users/:id',  actualizarusuarioid)
router.delete('/users/:id',  borrarusuarioid)




module.exports = router;
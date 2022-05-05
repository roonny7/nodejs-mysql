const { Router}  = require ( 'express');
//const { buscar } = require('../controllers/buscarusuarios.js');
const { buscarusuarios, borrarusuarioid, crearusuarios, buscarusuariosid, actualizarusuarioid } = require('../controllers/buscarusuarios')
const { buscarniveles, buscarnivelid, actualizarnivelid, crearniveles, borrarNivel } = require('../controllers/buscarniveles')
const { buscarempleados } = require('../controllers/buscarempleados');
const { buscarempleadosid } = require('../controllers/buscarempleadosid');
const { buscarhistorial } = require('../controllers/buscarhistorial');
const { buscarmovimientos } = require('../controllers/buscarmovimientos');
const router = Router();

router.get('/users/',  buscarusuarios);
router.post('/users/',  crearusuarios);
router.get('/users/:id',  buscarusuariosid)
router.put('/users/:id',  actualizarusuarioid)
router.delete('/users/:id',  borrarusuarioid)


router.get('/niveles/',  buscarniveles);
router.get('/niveles/:id',  buscarnivelid);
router.put('/niveles/:id',  actualizarnivelid);
router.post('/niveles/',  crearniveles);
router.delete('/niveles/:id',  borrarNivel)

router.get('/empleados/',  buscarempleados);
router.get('/empleados/:id',  buscarempleadosid);
router.get('/historial/:id',  buscarhistorial);
router.get('/movimientos/:id',  buscarmovimientos);



module.exports = router;
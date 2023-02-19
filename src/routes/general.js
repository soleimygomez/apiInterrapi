//Requires
const express = require('express');
const { body } = require('express-validator');

//Initialize
const router = express.Router();

//Controllers 
const general_controller = require('../controllers/general');

/*
//****************************************************** */
//****************************************************** */
//Login
router.post('/Login', general_controller.Login);


//Formulario
router.post('/Formulario/Create', general_controller.createFormulario);
router.get('/Formulario/All', general_controller.AllFormulario);
router.post('/tipoFormulario/Create', general_controller.createtipoFormulario);
router.get('/tipoFormulario/All', general_controller.AlltipoFormulario);
router.get('/SearchFormularioClient', general_controller.SearchFormularioClient);
router.put('/FormularioUpdateStatus', general_controller.FormularioUpdateStatus);


//Administrador
router.post('/Administrador/Create', general_controller.createAdministrador);

//Tasas de Cambio
router.post('/TasasCambio/Create', general_controller.createTasasCambio);
router.get('/TasasCambio/All', general_controller.AllTasasCambio);

//Entidad
router.post('/Entidad/Create', general_controller.createEntidad);
router.get('/Entidad/All', general_controller.AllEntidad);

//Moneda
router.post('/Moneda/Create', general_controller.createMoneda);
router.get('/Moneda/All', general_controller.AllMoneda);
//Export
module.exports = router;

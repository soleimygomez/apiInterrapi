//Requires
const dotenv = require("dotenv");
dotenv.config();
const { validationResult } = require('express-validator');
const dbSequelize = require('../config/database_sequelize.js');

const sequelize = dbSequelize.sequelize;
const fs = require('fs');

//Imports
const general_services = require('../services/general.js');

const createFormulario = async (req, res, next) => {

    try {
        const result = await general_services.createFormulario(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};
const Login = async (req, res, next) => {

    try {
        const result = await general_services.Login(req);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.data);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const AllFormulario = async (req, res, next) => {
    try {
        const result = await general_services.AllFormulario();
        if (result.status === 200) {
            let datNew = [];
            result.data.forEach( element => { 
                datNew.push({
                    "id": element.id,
                    "nombre_beneficiario": element.nombre_beneficiario,
                    "cedula_beneficiario": element.cedula_beneficiario,
                    "banco_beneficiario": element.banco_beneficiario,
                    "telefono_beneficiario": element.telefono_beneficiario,
                    "nro_cuenta": element.nro_cuenta,
                    "tipo_persona": element.tipo_persona,
                    "tipo_cuenta": element.tipo_cuenta,
                    "monto_enviar": element.monto_enviar,
                    "imagen_comprobante": element.imagen_comprobante,
                    
                    "terminos_comprobante": element.terminos_comprobante,
                    "email_comprobante": element.email_comprobante ,
                    "id_moneda": element.tipo_moneda.tipo,
                    "id_entidad": element.tipo_entidad.descripcion,
                    "id_formulario": element.tipo_formulario.descripcion,
                    "id_persona": element.persona.nombre,
                    "id_estado": element.estado.nombre,
                }) 

            }); 
            res.status(result.status).json(datNew);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};

const createAdministrador = async (req, res, next) => {

    try {
        const result = await general_services.createAdministrador(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const createTasasCambio = async (req, res, next) => {

    try {
        const result = await general_services.createTasasCambio(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const AllTasasCambio = async (req, res, next) => {
    try {
        const result = await general_services.AllTasasCambio();
        if (result.status === 200) {

            res.status(result.status).json(result);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};

const createEntidad = async (req, res, next) => {

    try {
        const result = await general_services.createEntidad(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const AllEntidad = async (req, res, next) => {
    try {
        const result = await general_services.AllEntidad();
        if (result.status === 200) {

            res.status(result.status).json(result);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};

const createtipoFormulario = async (req, res, next) => {

    try {
        const result = await general_services.createtipoFormulario(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const AlltipoFormulario = async (req, res, next) => {
    try {
        const result = await general_services.AlltipoFormulario();
        if (result.status === 200) {

            res.status(result.status).json(result);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};

const createMoneda = async (req, res, next) => {

    try {
        const result = await general_services.createMoneda(req);
        if (result.status === 200) {
            res.status(result.status).json(result.message);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        console.log('Error', e);
        res.status(500).json({
            message: 'Por favor, valida los datos ingresados e intenta nuevamente.',
        });
    }
};

const AllMoneda = async (req, res, next) => {
    try {
        const result = await general_services.AllMoneda();
        if (result.status === 200) {

            res.status(result.status).json(result);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};


const SearchFormularioClient = async (req, res, next) => {
    try {
        const result = await general_services.SearchFormularioClient(req);
        if (result.status === 200) {

            res.status(result.status).json(result);
        } else {
            res.status(result.status).json(result.message);
        }
        next();
    } catch (e) {
        res.status(500).json('No es posible obtener la información en este momento.');
    }

};
module.exports = {
    SearchFormularioClient, createFormulario, createMoneda, Login, AllMoneda, AllFormulario, AllEntidad, AlltipoFormulario, createtipoFormulario, createAdministrador, createTasasCambio, AllTasasCambio, createEntidad
}
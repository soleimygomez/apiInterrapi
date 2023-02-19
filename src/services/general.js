
const expirationTime = 5;
const jwt = require('jsonwebtoken');
const helpers = require('../../lib/helpers');
const persona = require('../../models/persona.js');
const dbSequelize = require('../config/database_sequelize.js');


const sequelize = dbSequelize.sequelize;
const Sequelize = dbSequelize.Sequelize;

const Op = dbSequelize.Sequelize.Op;
//Services
const createFormulario = async (req) => {

    const { nombre_beneficiario, cedula_beneficiario, banco_beneficiario, telefono_beneficiario,
        nro_cuenta, tipo_persona, tipo_cuenta,
        nombre_depositante, telefono_depositante, cedula_depositante, correo_depositante, instagram_depositante,
        monto_enviar, imagen_comprobante, terminos_comprobante, email_comprobante,
        id_moneda, id_entidad, id_formulario } = req.headers

    try {
        const PersonaSearch = await dbSequelize.persona.findAll({ where: { identificacion: cedula_depositante, correo: correo_depositante, rol_id: 2 } });
        if (PersonaSearch.length > 0) {
            // ya existe un usuario    
            let Formulario = {
                nombre_beneficiario, cedula_beneficiario, banco_beneficiario, telefono_beneficiario,
                nro_cuenta, tipo_persona, tipo_cuenta, monto_enviar, imagen_comprobante, terminos_comprobante, email_comprobante,
                id_moneda, id_entidad, id_formulario, id_persona: PersonaSearch[0].id_persona, id_estado: 0
            };

            let FormularioNew = await dbSequelize.formulario.create(Formulario);
            if (FormularioNew) {
                return { status: 200, message: "Enviado Correctamente" };
            }
            else { return { status: 404, message: "Error Enviando datos " }; }
        }
        else {//Crear la persona 
            let Persona = { nombre: nombre_depositante, identificacion: cedula_depositante, telefono: telefono_depositante, correo: correo_depositante, instagram: instagram_depositante, rol_id: 2 };
            let PersonaNew = await dbSequelize.persona.create(Persona);

            if (PersonaNew) {
                let Formulario = {
                    nombre_beneficiario, cedula_beneficiario, banco_beneficiario, telefono_beneficiario,
                    nro_cuenta, tipo_persona, tipo_cuenta, monto_enviar, imagen_comprobante, terminos_comprobante, email_comprobante,
                    id_moneda, id_entidad, id_formulario, id_persona: PersonaNew[0].id, id_estado: 0
                };

                let FormularioNew = await dbSequelize.formulario.create(Formulario);
                if (FormularioNew) {
                    return { status: 200, message: "Enviado Correctamente" };
                }
                else { return { status: 404, message: "Error Enviando datos " }; }

            } else { return { status: 404, message: "Error Enviando datos de la Persona que envia " }; }
        }

    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const AllFormulario = async () => {
    try {
        const Formularios = await dbSequelize.formulario.findAll({ include: [{ model: dbSequelize.persona, required: true }, { model: dbSequelize.tipoMoneda, required: true }, { model: dbSequelize.tipoFormulario, required: true }, { model: dbSequelize.tipoEntidad, required: true }, { model: dbSequelize.estado, required: true }] });
        return { status: 200, data: Formularios };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};

const createAdministrador = async (req) => {

    const {
        nombre, telefono, identificacion, contrasena, correo } = req.headers

    try {
        const PersonaSearch = await dbSequelize.persona.findOne(
            {
                attributes: ["id", "identificacion", "nombre", "rol_id", "telefono", "contrasena", "correo"],
                where: { nombre: nombre, correo: correo, rol_id: 1 }
            });

        if (!PersonaSearch) {
            // ya existe un usuario 
            const Persona = { nombre: nombre, telefono: telefono, identificacion: identificacion, correo: correo, rol_id: 1 };
            Persona.contrasena = await helpers.encryptPassword(contrasena);
            let PersonaNew = await dbSequelize.persona.create(Persona);
            if (PersonaNew) {
                return { status: 200, message: "Creado Correctamente" };
            }
            else { return { status: 404, message: "Error Creando datos " }; }
        }
        else {

            return { status: 404, message: "Error Administrador ya Registrado " };
        }


    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const Login = async (req) => {

    const { contrasena, correo } = req.headers

    try {
        const PersonaSearch = await dbSequelize.persona.findOne({
            attributes: ["identificacion", "nombre", "rol_id", "telefono", "contrasena", "correo"],
            where: { correo: correo, rol_id: 1 }
        });
        if (PersonaSearch) {
            const validPassword = await helpers.matchPassword(contrasena, PersonaSearch.contrasena);
            //console.log("VP",validPassword);
            if (validPassword) {
                //si el acceso es correcto se pone en uno la bandera del login en persona
                await dbSequelize.persona.update({ loginacces: 1 }, {
                    where: { correo: correo }
                });
                return { status: 200, data: { acceso: 'true' } };
            }
            else { return { status: 404, data: { acceso: 'false' } } }
        }
        else { return { status: 403, message: "Error El correo ingresado no existe" }; }


    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const FormularioUpdateStatus = async (req) => {

    const { idFormulario, status } = req.headers

    try {
        let updateStatus = await dbSequelize.formulario.update({ id_estado: status }, {
            where: { id: idFormulario }
        });
        if (updateStatus) {
            return { status: 200, message: "Se Actualizo Correctamente el estado" };
        }
        else { return { status: 403, message: "Error No se puedo actualizar el estado del formulario" }; }


    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const createTasasCambio = async (req) => {

    const { descripcion, valor } = req.headers

    try {
        const tasaCambio = { descripcion: descripcion, valor: valor, id_tipo_formulario: 1 };
        let tasaCambioNew = await dbSequelize.tasaCambio.create(tasaCambio);
        if (tasaCambioNew) {
            return { status: 200, message: "Creado Correctamente" };
        }
        else { return { status: 404, message: "Error Creando datos " }; }

    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const createMoneda = async (req) => {

    const { descripcion, tipo } = req.headers

    try {
        const moneda = { descripcion, tipo };
        let monedaNew = await dbSequelize.tasaCambio.create(moneda);
        if (monedaNew) {
            return { status: 200, message: "Creado Correctamente" };
        }
        else { return { status: 404, message: "Error Creando datos " }; }

    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const AllTasasCambio = async () => {
    var id_tipo_formulario = 1;
    try {
        const tasaCambios = await dbSequelize.tasaCambio.findAll({
            order: [
                ['id', 'DESC'],
            ],
            limit: 1,
            where: {
                id_tipo_formulario: id_tipo_formulario
            }
        });
        return { status: 200, data: tasaCambios };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};

const createEntidad = async (req) => {

    const { descripcion } = req.headers

    try {
        const Entidad = { descripcion };
        let EntidadNew = await dbSequelize.tipoEntidad.create(Entidad);
        if (EntidadNew) {
            return { status: 200, message: "Creado Correctamente" };
        }
        else { return { status: 404, message: "Error Creando datos " }; }

    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const createtipoFormulario = async (req) => {

    const { descripcion } = req.headers

    try {
        const Entidad = { descripcion };
        let EntidadNew = await dbSequelize.tipoEntidad.create(Entidad);
        if (EntidadNew) {
            return { status: 200, message: "Creado Correctamente" };
        }
        else { return { status: 404, message: "Error Creando datos " }; }

    } catch (e) {
        console.log(e);
        return { status: 500, message: "Error interno del servidor." }
    }
};

const AllEntidad = async () => {
    try {
        const tipoEntidad = await dbSequelize.tipoEntidad.findAll({});
        return { status: 200, data: tipoEntidad };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};

const AlltipoFormulario = async () => {
    try {
        const tipoFormulario = await dbSequelize.tipoFormulario.findAll({});
        return { status: 200, data: tipoFormulario };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};

const AllMoneda = async () => {
    try {
        const tipoMoneda = await dbSequelize.tipoMoneda.findAll({});
        return { status: 200, data: tipoMoneda };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};

const SearchFormularioClient = async (req) => {
    try {
        const { identificacion } = req.headers;
        console.log(identificacion)
        const Persona = await dbSequelize.persona.findOne({
            where: {
                identificacion: identificacion
            }
        });
        if (!Persona) {
            return { status: 403, data: { message: "No hay Informacion" } };
        }
        const formularios = await dbSequelize.formulario.findAll({ id_persona: Persona.id });

        return { status: 200, data: formularios };
    } catch (e) {
        console.log(e);
        //throw e;
        return { status: 500, data: [], message: "Error interno del servidor." };
    }
};


module.exports = { SearchFormularioClient, Login, FormularioUpdateStatus, AlltipoFormulario, AllMoneda, createMoneda, createFormulario, createtipoFormulario, AllFormulario, AllEntidad, createEntidad, createAdministrador, createTasasCambio, AllTasasCambio }
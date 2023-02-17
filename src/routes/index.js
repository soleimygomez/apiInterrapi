//Requires
const express = require('express');
 
const generalRoutes=require('./general.js');
//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/API/v1',router);
    router.use('/general',generalRoutes);
}

module.exports =routerApi;
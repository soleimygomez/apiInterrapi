const { Sequelize } = require('sequelize');


'use-strict';
 
const config = require('../config/db_config.json');
const sequelize = new Sequelize(

  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialectBd,

    pool: {
      max: config.max,
      min: config.min,
      require: config.require,
      idle: config.idle
    },
    logging: console.log,
    logging: function (str) {
      // do your own logging
      console.log("####################################################################11");
      console.log(str);
      console.log("####################################################################22");

    }
  }
);
var db = {};
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully. sequelize===================');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//******************************************************* sequelize ****************************
db.formulario = require('../../models/formulario.js')(sequelize, Sequelize);
db.persona = require('../../models/persona.js')(sequelize, Sequelize);
db.rol = require('../../models/rol.js')(sequelize, Sequelize);
db.tasaCambio = require('../../models/tasaCambio.js')(sequelize, Sequelize);
db.tipoEntidad=require('../../models/tipoEntidad.js')(sequelize, Sequelize);
db.tipoFormulario=require('../../models/tipoFormulario.js')(sequelize, Sequelize);
db.tipoMoneda=require('../../models/tipoMoneda.js')(sequelize, Sequelize); 





module.exports = db;


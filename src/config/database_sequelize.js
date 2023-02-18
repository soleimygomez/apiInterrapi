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
db.estado = require('../../models/estado.js')(sequelize, Sequelize);
db.tasaCambio = require('../../models/tasaCambio.js')(sequelize, Sequelize);
db.tipoEntidad=require('../../models/tipoEntidad.js')(sequelize, Sequelize);
db.tipoFormulario=require('../../models/tipoFormulario.js')(sequelize, Sequelize);
db.tipoMoneda=require('../../models/tipoMoneda.js')(sequelize, Sequelize); 


db.rol.belongsTo(db.persona, { foreignKey: 'rol_id' });
db.persona.hasOne(db.rol, { foreignKey: 'rol_id' });

db.tipoFormulario.belongsTo(db.formulario, { foreignKey: 'id_formulario' });
db.formulario.hasOne(db.tipoFormulario, { foreignKey: 'id_formulario' });

db.persona.belongsTo(db.formulario, { foreignKey: 'id_persona' });
db.formulario.hasOne(db.persona, { foreignKey: 'id_persona' });

db.tipoMoneda.belongsTo(db.formulario, { foreignKey: 'id_moneda' });
db.formulario.hasOne(db.tipoMoneda, { foreignKey: 'id_moneda' });

db.tipoEntidad.belongsTo(db.formulario, { foreignKey: 'id_entidad' });
db.formulario.hasOne(db.tipoEntidad, { foreignKey: 'id_entidad' });

db.estado.belongsTo(db.formulario, { foreignKey: 'id_estado' });
db.formulario.hasOne(db.estado, { foreignKey: 'id_estado' });



module.exports = db;


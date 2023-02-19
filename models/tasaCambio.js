module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tasa_cambio', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: null
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      defaultValue: null
    },  
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      defaultValue: null
    }, 
    id_tipo_formulario: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      defaultValue: null
    }, 
  }, {
    tableName: 'tasa_cambio'
  });
  
};
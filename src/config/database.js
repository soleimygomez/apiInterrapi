//Requires
const mysql = require('mysql');
const { promisify } = require('util');
const config = require('../config/db_config.json');

//DBConnection
 const poolConnection = mysql.createPool({
     host: config.host,
     user: config.username,
     password: config.password,
     database: config.database,
     connectionLimit : 1,
    //  debug: ['ComQueryPacket']
    // debug: ['EofPacket']

 });

/* const poolConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'avanzo',
}); */

//HandleConnection
poolConnection.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) {
        connection.release();
        console.log('Pool DB is connected');
        return;
    }
});

poolConnection.beginTransaction = function beginTransaction(options, callback) {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = options || {};
    options.sql = 'START TRANSACTION';
    options.values = null;
     console.log("Pool start transaction");
    return this.query(options, callback);
  };
  
  poolConnection.commit = function commit(options, callback) {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = options || {};
    options.sql = 'COMMIT';
    options.values = null;
    console.log("Pool commit transaction");

    return this.query(options, callback);
  };
  
  poolConnection.rollback = function rollback(options, callback) {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = options || {};
    options.sql = 'ROLLBACK';
    options.values = null;
    console.log("Pool rollback transaction");

    return this.query(options, callback);
  };

  poolConnection.end = function end(options, callback) {
    var cb   = callback;
    var opts = options;
  
    if (!callback && typeof options === 'function') {
      cb   = options;
      opts = null;
    }
  
    // create custom options reference
    opts = Object.create(opts || null);
  
    if (opts.timeout === undefined) {
      // default timeout of 30 seconds
      opts.timeout = 30000;
    }
    console.log("Pool end conection");

    this._implyConnect();
    this._protocol.quit(opts, wrapCallbackInDomain(this, cb));
  };
  
  poolConnection.destroy = function() {
    console.log("Pool destroy transaction");

    this.state = 'disconnected';
    this._implyConnect();
    this._socket.destroy();
    this._protocol.destroy();
  };
  


poolConnection.query = promisify(poolConnection.query);

module.exports = poolConnection;

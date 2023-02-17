const express = require('express');
const morgan = require('morgan');
//Initialize
const app = express();
const RoutesApi = require("./src/routes/index")
 
app.set('port',  process.env.PORT ||  4001);
//app.use(express.static(__dirname + '../files'));
app.use(express.json());
app.use(morgan('dev'));
var cors = require('cors');
app.use(cors());
app.options('*', cors())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token,  X-Requested-With, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    next();
});

//Routes
RoutesApi(app);
//Server
app.listen(app.get('port'), () => {
    console.log('Server in port: 4001');
});

module.exports = app

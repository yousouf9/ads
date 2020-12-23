const errorhandler = require('./Middlewares/error');
                     require('express-async-errors');
const cookieParser = require('cookie-parser');
const winston = require('winston');
                require('winston-mongodb');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const config = require('config');
const serverDebug = require('debug')('App:server');
const cors = require('cors');
const express = require('express');



const app = express();
      app.use(cors());
    
require('./startup/db');
require('./startup/startup')(app);

process.on('uncaughtException', (ex)=>{
    console.log('A FATAL ERROR UNCAUGHTEXCEPTION', ex)
    winston.error(ex.message, ex)
    process.exit(1)
})

process.on('unhandledRejection',  (ex)=>{

 console.log('A FATAL ERROR UNHANDLEEXCEPTION')
 winston.error(ex.message, ex)
 process.exit(1)


})


winston.add(new winston.transports.File({filename: 'logfile.log'}));
winston.add(new winston.transports.MongoDB({db: config.get('hostname')}));

//checking for Jsonwebtoken key
if(!config.get("jwtPrivate")){
    serverDebug('A FATAL ERROR jwtPrivate is requires', config.get('jwtPrivate'));
    process.exit(1);
  }



const Farmer = require('./Routes/farmer');
const State = require('./Routes/state'); 
const Country = require('./Routes/country');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))   
app.use(cookieParser());


app.use('/api', Farmer);
app.use('/api', State);
app.use('/api', Country);


app.use(errorhandler)
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    serverDebug(`Listening at Port ${PORT}`);
})

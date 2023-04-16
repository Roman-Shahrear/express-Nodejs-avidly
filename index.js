const home = require('./routes/home');
const movieGenres = require('./routes/movieGenres')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const dotenv = require('dotenv');
const  logger  = require('./middleware/logger');
dotenv.config();

const app = express();



//adding json middleware function
app.use(express.json()); //json req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
// route
app.use('/', home);
app.use('api/genres', movieGenres);


// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));



if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
  }else if(app.get('env') === 'production'){
    app.use(morgan('tiny'));
    //console.log('Morgan enabled...');
  }
// after adding we need to install this middleware function in request pipeline by calling
app.use(logger.log);
app.use(logger.authentication);


const port = process.env.PORT || 3000;
//const environment = process.env.ENVIRONMENT || 'development';
//const environment2 = process.env.ENVIRONMENT2 || 'production';

app.listen(port, () => {
    console.log(`server listening on port ${port} ....`);
});

// in ${environment} faces
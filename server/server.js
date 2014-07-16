var express   = require('express'),
    app       = express(),
    passport  = require('passport');

// require('./config/passportConfig.js')(passport);
require('./config/serverConfig.js')(express, app, passport);

module.exports = app;
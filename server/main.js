'use strict';

var express   = require('express');
var passport  = require('passport');

require('./config/db');
require('./config/passport')(passport);

var app = express();

require('./api/config')(app, express, passport);

module.exports = app;

'use strict';
var config    = require('./config'),
    mongoose  = require('mongoose');

mongoose.connect(config.mongoURL);

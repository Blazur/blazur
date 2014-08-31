'use strict';

var morgan    = require('morgan'),
    bdParser  = require('body-parser'),
    // $custom   = require('../middleware/main'),
    compress  = require('compression'),
    config    = require('../config/config');


module.exports = function(app, express, passport) {
  app.set('port', config.port);

  app.use(morgan('dev'));
  app.use(bdParser.json({ extended: true }));

  // app.use(compress());
  app.use(express.static(__dirname + '/../../bower_components'));

  if (config.env === 'development') {
    app.use(express.static(__dirname + '/../../.tmp'));
    app.use(express.static(__dirname + '/../../app'));
  } else {
    app.use(express.static(__dirname + '/../../dist'));
  }

};










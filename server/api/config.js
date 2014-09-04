'use strict';

var morgan    = require('morgan'),
    bdParser  = require('body-parser'),
    $custom   = require('../middleware/custom'),
    compress  = require('compression'),
    config    = require('../config/config');

module.exports = function(app, express, passport) {
  var userRouter = express.Router();

  app.set('port', config.port);
  app.use(morgan('dev'));
  app.use(bdParser.json());
  app.use(bdParser.urlencoded({ extended: true }));
  app.use(compress());
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/../../bower_components'));

  if (config.env === 'development') {
    app.use(express.static(__dirname + '/../../.tmp'));
    app.use(express.static(__dirname + '/../../app'));
  } else {
    app.use(express.static(__dirname + '/../../dist'));
  }

  app.use('/api/v1/user', userRouter);
  app.use($custom.logErrors);

  require('./user/userRoutes')(userRouter, passport);
};










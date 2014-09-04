'use strict';

/**
 * Express config
 */

var express      = require('express'),
    favicon      = require('serve-favicon'),
    morgan       = require('morgan'),
    compression  = require('compression'),
    bodyParser   = require('body-parser'),
    mOverride    = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path         = require('path'),
    config       = require('./environment'),
    passport     = require('passport'),
    mongoose     = require('mongoose');

exports = module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(mOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'dist')));
    app.set('appPath', config.root + '/dist');
    app.use(morgan('dev'));
  }

  if ('devlopment' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('appPath', 'app');
    app.use(morgan('dev'));
    app.use(errorhandler());
  }
};

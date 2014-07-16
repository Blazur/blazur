var morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');
    // helpers     = require('./helpers.js');

mongoose.connect('mongodb://localhost/blazur');

module.exports = function(express, app, passport) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../client'));

};
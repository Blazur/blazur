'use strict';

/**
 * Main app file
 */

// Default to dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express   = require('express'),
    mongoose  = require('mongoose'),
    config    = require('./config/environment');

// Conntect to mongo
mongoose.connect(config.mongo.uri);

// Populate DB with sample data
if (config.seedDB) { require('./config/seed') };

var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app for testing and stuff
exports = module.exports = app;

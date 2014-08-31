'use strict';

var app     = require('./server/main.js'),
    server  = app.listen(app.get('port')),
    ioAuth  = require('socketio-jwt'),
    io      = require('socket.io').listen(server),
    secret  = require('./server/config/config').jwt;

// io.set('authorization', ioAuth.authorize({
//   secret: secret,
//   handshake: true
// }));

io.sockets.on('connection', function(socket) {
  require('./server/api/user/socket/routes')(socket, io);
});

console.log('on port ', app.get('port'));

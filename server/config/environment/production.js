'use strict';

// Production specific config
// +++++============++++++++====

exports = module.exports = {
  // Server IP
  ip: process.env.IP || undefined,

  // Server  port
  port: process.env.PORT || 8080,
  // Mongo DB conecction stuff
  mongo: {
    uri: process.env.MONGOHQ_URL ||
         process.env.MONGOLAB_URI ||
         'mongodb://localhost/devkeep'
  }
};

'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + 'environment variable');
  }
  return process.env[name];
}


// All configs will extend these

var defaults = {
  env: process.env.NODE_ENV,

  // Root path to the sever
  root: path.normalize(__dirname + '/../../..'),

  port: process.env.PORT || 4000,

  seedDB: false,

  secrets: {
    jwt: process.env.JWT_SECRET
  },

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }
};

// Export the config object based on the NODE_ENV
exports = module.exports = _.merge(defaults, require('./' + process.env.NODE_ENV ) || {});

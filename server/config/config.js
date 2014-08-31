'use strict';

module.exports = {
  jwt: process.env.JWT_SECRET || 'bananacat',
  port: process.env.PORT || 4000,
  mongodURL: process.env.MONGOHQ_URL || 'mongodb://localhost/devkeep',
  env: process.env.NODE_ENV,
  github: {}
};

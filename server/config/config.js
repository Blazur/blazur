'use strict';

var url = process.env.URL || 'http://localhost:4000';
module.exports = {
  jwt: process.env.JWT_SECRET || 'bananacat',
  port: process.env.PORT || 4000,
  mongoURL: process.env.MONGOHQ_URL || 'mongodb://localhost/devkeep',
  env: process.env.NODE_ENV,
  github: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
    cbURL: url + '/api/v1/user/oauth/github/callback'
  }
};

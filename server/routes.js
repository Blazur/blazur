'use strict';

var errors = require('./components/errors');

exports = module.exports = function(app) {

  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  app.route('/:url(api|auth|fonts|images|scripts|styles|bower_components|)/*');
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};

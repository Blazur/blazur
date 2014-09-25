'use strict';

var errors = require('./components/errors');

exports = module.exports = function(app) {

  app.use('/api/users', require('./api/user'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/auth', require('./auth'));

  app.route('/*(api|auth|fonts|images|scripts|styles|bower_components|)/*')
    .get(errors[404]);
  app.route('/*')
    .get(function(req, res) {
      console.log('____hrer___')
      res.sendFile(app.get('appPath') + '/index.html');
    });
};

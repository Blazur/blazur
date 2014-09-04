'use strict';

var userController = require('./userController');

module.exports = UserRoutes;

function UserRoutes(app, passport) {
  /* authentication routes for all users */
  app.post('/signin', userController.signin);
  app.get('/oauth/github', passport.authenticate('github', { session: false }));
  app.get('/oauth/github/callback', passport.authenticate('github', { session: false }), userController.done);
  // app.get('/oauth/google', passport);
  // app.get('/oauth/google/callback');
}

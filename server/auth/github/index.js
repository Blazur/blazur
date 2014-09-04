'use strict';

var express   = require('express'),
    passport  = require('passport'),
    auth      = require('../auth.service');

var router = express.Router();

router
  // actual route is '/auth/github'
  .get('/', passport.authenticate('github', {
    failureRedirect: '/closewindow',
    session: false
  }))

  // actual route is '/auth/github/callback'
  .get('/callback', passport.authenticate('github', {
    failureRedirect: '/closewindow',
    session: false
  }), auth.setTokenCookie);

exports = module.exports = router;

'use strict';

var expressJwt    = require('express-jwt'),
    compose       = require('composable-middleware'),
    User          = require('../api/user/userModel'),
    config        = require('../config/config'),
    _             = require('lodash'),
    validateJwt   = expressJwt({ secret: config.secrets.jwt });

/**
 * Attach the user object to the request if authenticated
 * Otherwise 403 that fool
 */

function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow jwt to be placed on query string too
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Beaer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // attach user to the request
    .use(function(req, res, next) {
      User.findById(req.user._id, function(err, user) {
        if (err) {
          return next(err);
        }

        if (!user || _.isEmpty(user)) {
          return res.send(401);
        }

        req.user = user;
        next();
      });
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.jwt, { expiresInMintes: 60*24*7 /* a week */ });
}

/**
 * Set jwt token cookie directly for all OAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).json({ message: 'Something went wrong, please try again.' });
  }
  var token = signToken(req.user._id);
  res.cookie('__devkeep', JSON.stringify(token));
  // this entire flow happens inside a popup window, we must
  // redirect the window to some other html file that calls window.close
  res.redirect('/closewindow');
}

exports.isAuthenticated = isAuthenticated;
export.signToken = signToken;
exports.setTokenCookie = setTokenCookie;

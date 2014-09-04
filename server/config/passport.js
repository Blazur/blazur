'use strict';
var OAuth = require('passport-oauth').OAuth2Strategy;
var config = require('./config');
var User = require('../api/user/userModel');
var GitHub = require('passport-github').Strategy;
/*-----------   GitHub stuff  ------------*/
var GitHubStrategy = new GitHub({
  // authorizationURL: 'https://github.com/login/oauth/authorize',
  // tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: config.github.id,
  clientSecret: config.github.secret
  // callbackURL: config.github.cbURL
}, ghCallback);

function ghCallback(accessToken, refreshToken, profile, done) {
  var user = {
    email: profile.emails[0].value,
    providers:{
      github: {
        id: profile.id,
        token: accessToken
      }
    }
  };
  User.findOneOrCreateOne({ 'providers.github.id': profile.id }, user)
    .then(function(user) {
      done(null, user);
    })
    .fail(done);
}

/* -------------- Google Stuff -----------*/

module.exports = function(passport) {
  passport.use('github', GitHubStrategy);
  return passport;
};

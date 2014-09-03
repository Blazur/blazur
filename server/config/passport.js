'use strict';
var GitHub = require('passport-github').Strategy;
var config = require('./config');
var User = require('../api/user/userModel');
/*-----------   GitHub stuff  ------------*/
var GitHubStrategy = new GitHub({
  clientID: config.github.id,
  clientSecret: config.github.secret
  // callbackURL: config.github.cbURL
});

function ghCallback(accessToken, refreshToken, profile, done) {
  User.findOneOrCreateOne({ 'providers.github': profile.id })
    .then(function(user) {
      console.log(user);
      done(null, user);
    })
    .fail(done);
}

/* -------------- Google Stuff -----------*/

module.exports = function(passport) {
  passport.use('github', GitHubStrategy, ghCallback);
  return passport;
};

'use strict';

exports.setup = function(User, config) {
  var passport = require('passport');
  var GitHub = require('passport-github').Strategy;

  var GitHubStrategy = new GitHub({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret
  }, ghCallback);

  function ghCallback(accessToken, refreshToken, profile, done) {
    var user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      username: profile.username,
      provider: 'github',
      github: {
        id: profile.id,
        token: accessToken,
        avatar_url: profile._json.avatar_url
      }
    };

    console.log(profile._json);
    User.findOneOrCreateOne({ 'github.id': profile.id }, user)
      .then(function(user) {
        done(null, user);
      })
      .fail(done);
  }

  passport.use('github', GitHubStrategy);
};

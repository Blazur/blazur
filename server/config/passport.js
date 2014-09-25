// 'use strict';
// var OAuth = require('passport-oauth').OAuth2Strategy;
// var config = require('./config');
// var User = require('../api/user/userModel');
// var GitHub = require('passport-github').Strategy;
// /*-----------   GitHub stuff  ------------*/
// var GitHubStrategy = new GitHub({
//   clientID: config.github.id,
//   clientSecret: config.github.secret
// }, ghCallback);

// function ghCallback(accessToken, refreshToken, profile, done) {
//   console.log(profile);

//   var user = {
//     email: profile.emails[0].value,
//     provider: 'github',
//     github: {
//       id: profile.id,
//       token: accessToken
//     }
//   };


//   User.findOneOrCreateOne({ 'github.id': profile.id }, user)
//     .then(function(user) {
//       done(null, user);
//     })
//     .fail(done);
// }

// /* -------------- Google Stuff -----------*/

// module.exports = function(passport) {
//   passport.use('github', GitHubStrategy);
//   return passport;
// };

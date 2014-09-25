'use strict';

var mongoose    = require('mongoose'),
    Q           = require('q'),
    _           = require('lodash');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },

  name: String,

  username: String,

  messages: [
    {
      type: mongoose.Schema.ObjectId,
    }
  ],

  provider: String,

  github: {
    id: String,
    token: String,
    avatar_url: String
  },

  developer: {
    type: Boolean,
    default: false
  },

  skills: []
});


UserSchema
  .path('email')
  .validate(function(email){
    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
  }, 'Not A Valid Email');


UserSchema.statics.findOneOrCreateOne = function(query, maybe) {
  if (!query) {
    throw Error('Must have a query');
  }

  if (typeof query !== 'object') {
    throw Error('Query must be an object');
  }

  if (!maybe) {
    throw Error('You must pass in an usre just in case');
  }

  var future = Q.defer();
  var User = mongoose.model('User');

  User.findOne(query, function(err, user) {
    if (err) {
      return future.reject(err);
    }

    if (user && !_.isEmpty(user)) {
      return future.resolve(user);
    }

    User.create(maybe, function(err, user) {
      future.resolve(user);
    });
  });
  return future.promise;
};

module.exports = mongoose.model('User', UserSchema);

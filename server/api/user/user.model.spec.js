'use strict';
var expect = require('expect.js');
var app = require('../../app');
var User = require('./user.model');

var remove = function(done) {
  User.remove().exec().then(function() {
    done();
  });
};

var user = new User({
  providers: {
    github: {
      id: 'sawwlwfjlsjfl',
      token: 'sjdflsjljdlkfjlsjjllkj'
    }
  },
  email: 'test@test.com'
});

describe('User', function() {
  before(function(done) {
    remove(done);
  });

  afterEach(function(done) {
    remove(done);
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      expect(users.length).to.be(0);
      done();
    });
  });
});

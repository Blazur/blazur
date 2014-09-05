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

describe('User model', function() {
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

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      new User(user)
        .save(function(err) {
          expect(err).to.be.ok();
          done();
        });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      expect(err).to.be.ok();
      done();
    });
  });

  it('should find one or create one', function(done) {
    user.email = 'test@test.com';
    User.findOneOrCreateOne({ 'providers.github.id': user.providers.github.id }, user)
      .then(function(user) {
        expect(user).to.be.an('object');
        expect(user.email).to.be('test@test.com');
        expect(user._id).to.be.ok();
        done();
      });
  });
});

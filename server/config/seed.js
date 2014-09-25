'use strict';

var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    providers: 'github',
    username: 'dougalsscalhoun',

    github: {
      id: 'efhkshfiwhf',
      token: 'sfosuowsfh hwowojwjfpu83289h',
      avavtar_url: 'http://somthing.com.1234'
    },
    developer: true,
    email: 'test@test.com'
  }, {
    providers: 'github',
    username: 'dooska',
    github: {
      id: 'insnajioweriewrognl',
      token: 'sfosuowsfh hwowojwjfpu83289h',
      avavtar_url: 'http://somthing.com.1234'
    },
    email: 'test212@test.com'
  }, function(nulll, user1, user2) {
      console.log('finished populating users');
    }
  );
});

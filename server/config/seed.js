'use strict';

var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    providers: {
      github: {
        id: 'efhkshfiwhf',
        token: 'sfosuowsfh hwowojwjfpu83289h',
        gravatarId: 'safsdafsdafsdf'
      }
    },
    email: 'test@test.com'
  }, {
    providers: {
      local: {
        password: 'test'
      }
    },
    email: 'admin@admin.com',
  }, function() {
      console.log('finished populating users');
    }
  );
});

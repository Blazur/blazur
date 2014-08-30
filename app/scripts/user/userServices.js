(function() {
  'use strict';

  angular.module('app.user.services', [])

  .factory('UserFactory', ['$http', '$window', function(http, $window) {
    var UserFactory = {
      signout: function() {},
      isSignedIn: function() {}
    };

    return UserFactory;
  }]);

}());

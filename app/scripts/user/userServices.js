(function() {
  'use strict';

  angular.module('app.user.services', [])

  .factory('UserFactory', ['$http', '$window', function(http, win) {
    var UserFactory = {
      signout: function() {
        win.localStorage.removeItem('bz');
      },
      isSignedIn: function() {
        return !!win.localStorage.getItem('bz');
      }
    };

    return UserFactory;
  }]);

}());

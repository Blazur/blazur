(function() {
  'use strict';

  angular.module('app.user.services', [])

  .factory('UserFactory', ['$http', '$window','$state', function(http, win, state) {
    var UserFactory = {
      signout: function() {
        win.localStorage.removeItem('bz');
        state.go('app.home.landing');
      },
      isSignedIn: function() {
        return !!win.localStorage.getItem('bz');
      }
    };

    return UserFactory;
  }]);

}());

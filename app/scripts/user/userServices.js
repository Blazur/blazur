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
      },

      signinOauth: function(provider) {
        var windowParams = 'location=0,status0,modal=yes,alwaysRaised=yes,width=800,height=600';
        win.open('http://localhost:3000/auth/' + provider, '_blank', windowParams);
      }
    };

    return UserFactory;
  }]);

}());

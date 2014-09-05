(function() {
  'use strict';

  angular.module('app.user.services', ['ngCookies'])

  .factory('UserFactory', ['$http', '$window','$state', '$cookies', function($http, $win, $state, $cookies) {
    var UserFactory = {
      signout: function() {
        $win.localStorage.removeItem('__devkeep');
        $state.go('app.home.landing');
      },
      // we need this in our .run to check to see if the user is signed in or not
      isSignedIn: function() {
        return !!$win.localStorage.getItem('__devkeep');
      },

      signinOauth: function(provider) {
        var windowParams = 'location=0,status0,modal=yes,alwaysRaised=yes,width=800,height=600';
        var oauthWindow = $win.open('http://localhost:3000/auth/' + provider, '_blank', windowParams);

        oauthWindow.onunload = function(e) {
          var token = $cookies.__devkeep;

          if (!token) {
            // show error
          } else {
            // set in local storage and proceed
            console.log('got token');
            $win.localStorage.setItem('__devkeep', token);
            // $state.go('app.main.profile');
          }
        };

      }
    };

    return UserFactory;
  }]);

}());

(function() {
  'use strict';

  angular.module('app.user.services', ['ngCookies'])

  .factory('UserFactory', ['$http', '$window','$state', '$cookieStore', 'Rest', function($http, $win, $state, $cookieStore, Rest) {
    var user = {};
    var UserFactory = {
      signout: function() {
        $cookieStore.remove('__devkeep');
        $state.go('app.home.landing');
      },
      // we need this in our .run to check to see if the user is signed in or not
      isSignedIn: function() {
        return !!$cookieStore.get('__devkeep');
      },

      signinOauth: function(provider) {
        var windowParams = 'location=0,status0,modal=yes,alwaysRaised=yes,width=800,height=600';
        var oauthWindow = $win.open(Rest.url + '/auth/' + provider, '_blank', windowParams);

        oauthWindow.onunload = function(e) {
          var token = $cookieStore.get('__devkeep');

          if (!token) {
            // show error
          } else {
            // set in local storage and proceed

            // $win.localStorage.setItem('__devkeep', token);
            $state.go('app.profile');
          }
        };

      }
    };

    return UserFactory;
  }]);

}());

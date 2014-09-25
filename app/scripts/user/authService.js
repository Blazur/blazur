(function() {
  'use strict';

  angular.module('app.user.auth', ['ngCookies'])

  .factory('AuthFactory', ['$http', '$window','$state', '$cookieStore', '$q', '$interval', 'API', 'User',
  function($http, $win, $state, $cookieStore, $q, $interval, API, User) {
    var currentUser = {};
    // check to see if user is already signed in when
    if ($cookieStore.get('__devkeep')) {
      currentUser = User.get();
    }

    var AuthFactory = {
      getCurrentUser: function() {
        return currentUser;
      },

      signout: function() {
        $cookieStore.remove('__devkeep');
        currentUser = {};
        $state.go('app.home.landing');
      },
      // we need this in our .run to check to see if the user is signed in or not
      isSignedIn: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function(user) {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('email')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      getToken: function(){
        return $cookieStore.get('__devkeep');
      },

      signinOauth: function(provider) {
        var windowParams = 'location=0,status0,modal=yes,alwaysRaised=yes,width=800,height=600';
        var oauthWindow = $win.open(API.url + '/auth/' + provider, '_blank', windowParams);

        checkIfClosed();

        function checkIfClosed() {
          var ouathInterval = $interval(function() {
            if (!oauthWindow || oauthWindow.closed) {
              var token;
              token = $cookieStore.get('__devkeep');
              if (!token) {

              } else {
                currentUser = User.get();
                $state.go('app.profile');
              }
              $interval.cancel(ouathInterval);
            }
          }, 500);
        }
      }
    };

    return AuthFactory;
  }]);
}());

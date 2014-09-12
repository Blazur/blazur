(function() {
  'use strict';

  var configBlock = ['$stateProvider', '$urlRouterProvider', '$httpProvider', function(State, Url, Http) {
    Http.interceptors.push('authInterceptor');

    Url.otherwise('/');

    State
      .state('app', {
        abstract: true,
        template: '<ui-view />'
      });
  }];

  var runBlock = ['$rootScope', '$state' , 'AuthFactory', function(Root, State, UserFactory) {
    // do some auth check stuff here
    Root.$on('$stateChangeStart', function(evt, toState, toStateParams, fromState) {
      if (toState.authenticate && !UserFactory.isSignedIn()) {
        State.go('app.home.landing');
      }
    });
  }];

  angular.module('app', [
    'ngFx',
    'ui.router',
    'app.home',
    'app.user',
    'app.profile'
  ])
  .config(configBlock)
  .factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', function($rootScope, $q, $cookieStore) {
    return {
      // add JWT to header here
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('__devkeep')) {
          console.log($cookieStore.get('__devkeep'))
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('__devkeep');
        }
        return config;
      }
    };
  }])
  .run(runBlock)
  .constant('API', {
      dev: 'http://localhost:4000',
      prod: '',
      url: 'http://localhost:3000',
      checkTokenUrl: function(env) {
        return api[env] + '/validate';
    }
  });

}());

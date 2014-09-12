(function() {
  'use strict';

  var configBlock = ['$stateProvider', '$urlRouterProvider', function(State, Url) {
    Url.otherwise('/');

    State
      .state('app', {
        abstract: true,
        template: '<ui-view />'
      });
  }];

  var runBlock = ['$rootScope', '$state' , 'UserFactory', function(Root, State, UserFactory) {
    // do some auth check stuff here
    Root.$on('$stateChangeStart', function(evt, toState, toStateParams, fromState) {
      console.log('about to go');
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
  .run(runBlock)
  .value('API', function(){
    var api = {
      dev: 'http://localhost:4000',
      prod: '',
      checkTokenUrl: function(env) {
        return api[env] + '/validate';
      }
    };
    return api;
  });

}());

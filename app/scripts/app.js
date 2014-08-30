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
  }];

  angular.module('app', [
    'ngFx',
    'ui.router',
    'app.home',
    'app.user'
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

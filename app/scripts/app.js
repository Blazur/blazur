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

  var runBlock = ['$rootScope', '$state', function(Root, State) {

  }];

  angular.module('app', [
    'ngFx',
    'ui.router',
    'app.home'
  ])
  .config(configBlock)
  .run(runBlock);

}());

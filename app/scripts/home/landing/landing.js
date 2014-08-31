(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.landing', {
        url: '/',
        template: '<h1>Home</h1>'
      });
  }];
  angular.module('app.home.landing', [])
  .config(configBlock);
}());

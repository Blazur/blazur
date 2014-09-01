(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.landing', {
        url: '/',
        templateUrl: 'scripts/home/landing/landing.tpl.html'
      });
  }];
  angular.module('app.home.landing', [])
  .config(configBlock);
}());

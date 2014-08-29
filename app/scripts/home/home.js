(function() {
  'use strict';

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home', {
        url: '/',
        controller: 'HomeController as home',
        templateUrl: 'scripts/home/home.tpl.html'
      });
  }];

  angular.module('app.home', [
    'classy'
  ])
  .config(configBlock)
  .classy.controller({
    name: 'HomeController',

    inject: ['$scope'],

    init: function() {
      this.name = 'name';
    }
  });
}());

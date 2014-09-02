(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.auth', {
        abstract: true,
        template: '<ui-view />'
      });
  }];
  angular.module('app.home.auth', [])
  .configBlock(configBlock);
}());

(function() {
  'use strict';

  var configBlock = ['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.profile.history', {
        url: '/history',
        templateUrl: 'profile/history.html',
        controller: 'HistoryController',
        authenticate: true,
        animation: {
          speed: '600',
          ease: 'strong',
          leave: 'grow-in',
          enter: 'shrink-out'
        }
      });
  }];

  angular.module('app.profile.history', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'HistoryController',
    init: function() {

    },
    inject: ['$scope']
  });
}());

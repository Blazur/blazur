(function() {
  'use strict';

  var configBlock = ['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.profile.settings', {
        url: '/settings',
        templateUrl: 'profile/settings.html',
        controller: 'SettingsController',
        authenticate: true,
        animation: {
          speed: '600',
          ease: 'strong',
          leave: 'shrink-out',
          enter: 'shrink-in'
        }
      });
  }];

  angular.module('app.profile.settings', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'SettingsController',
    init: function() {

    },
    inject: ['$scope']
  });
}());

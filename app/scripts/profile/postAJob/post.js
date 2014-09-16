(function() {
  'use strict';

  var configBlock = ['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.profile.post', {
        url: '/post-a-job',
        templateUrl: 'profile/post-a-job.html',
        controller: 'PostController',
        authenticate: true,
        animation: {
          speed: '600',
          ease: 'strong',
          leave: 'grow-in',
          enter: 'shrink-out'
        }
      });
  }];

  angular.module('app.profile.post', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'PostController',
    init: function() {

    },
    inject: ['$scope']
  });
}());

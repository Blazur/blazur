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
          leave: 'shrink-out',
          enter: 'shrink-in'
        }
      });
  }];

  angular.module('app.profile.post', ['classy'])
  .config(configBlock)
  .directive('newJob', [function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'new-job.html',
      scope: {},
      link: function(scope, element, attr) {
        scope.job = {
          stage: ''
        };

        var input = element.find('input');

        input.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '500px', ease: Strong.easeInOut, onComplete: function() {
            scope.ready = true;
            scope.$apply();
          } });
        });

        input.on('blur', function() {
          if (scope.job.title || scope.job.price) {
            return;
          }

          scope.ready = false;
          scope.$apply();
          TweenMax.to(element, 0.5, { height: '62px', ease: Strong.easeInOut });
        });
      }
    };
  }])
  .classy.controller({
    name: 'PostController',
    init: function() {

    },

    createJob: function(form) {
      console.log(form);
      if (form.$valid) {
        this.$http({
          method: 'POST',
          url: 'api/jobs',
          data: this.$.job
        });
      }

    },
    inject: ['$scope', '$http']
  });
}());

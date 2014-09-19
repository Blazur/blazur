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
          leave: 'grow-in',
          enter: 'shrink-out'
        }
      });
  }];

  angular.module('app.profile.settings', ['classy'])
  .config(configBlock)
  .directive('creditCard', [function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'credit-card.html',
      scope: {},
      link: function(scope, element, attr) {
        scope.creditCard = {
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
          if (scope.creditCard.stuff) {
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
    name: 'SettingsController',
    init: function() {

    },
    inject: ['$scope']
  });
}());

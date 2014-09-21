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
        scope.creditCard = {};
        scope.ready = {
          number: false,
          cvv: false,
          expiration: false,
          submit: false
        };

        scope.saveCreditCard = function(creditCard) {
          console.log('Saving Credit Card =>', creditCard);
        };

        var input = element.find('input');

        var ccName = angular.element(document.getElementById('cc-name')).children();
        ccName.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.ready.number = true;
            scope.$apply();
          } });
        });

        var ccNumber = angular.element(document.getElementById('cc-number')).children();
        ccNumber.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.ready.cvv = true;
            scope.$apply();
          } });
        });

        var ccCVV = angular.element(document.getElementById('cc-cvv')).children();
        ccCVV.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.ready.expiration = true;
            scope.$apply();
          } });
        });

        var ccExpiration = angular.element(document.getElementById('cc-expiration')).children();
        ccExpiration.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.ready.submit = true;
            scope.$apply();
          } });
        });

        input.on('blur', function() {
          if (_.any(_.values(scope.ready), function(item) {
            return item === true;
          })) {
            return;
          }

          scope.ready = false;
          scope.number = false;
          scope.cvv = false;
          scope.expiration = false;
          scope.submit = false;
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

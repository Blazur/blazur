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
  .directive('creditCard', [function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'credit-card.html',
      scope: {},
      link: function(scope, element, attr) {
        scope.creditCard = {};

        scope.saveCreditCard = function(creditCard) {
          console.log('Saving Credit Card =>', creditCard);
        };

        var input = element.find('input');

        // var ccElements = ['cc-name', 'cc-number', 'cc-ccv', 'cc-expiration'];
        // var ccCallbacks = {
        //   'cc-name': scope.number = true,
        //   'cc-number': scope.cvv = true,
        //   'cc-ccv': scope.expiration = true,
        //   'cc-expiration': scope.submit = true
        // };

        // var ccValidation = function(ccElements) {
        //   _.each(ccElements, function(element) {
        //     var ccInput = angular.element(document.getElementById(element)).children();
        //     ccInput.on('focus', function() {
        //       TweenMax.to(element, 0.5, { height: '500px', ease: Strong.easeInOut, onComplete: function() {
        //         // scope.number = true;
        //         var shit = function() { return ccCallbacks[element]; };
        //         shit();
        //         scope.$apply();
        //       } });
        //     });
        //   });
        // };


        var ccName = angular.element(document.getElementById('cc-name')).children();
        ccName.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.number = true;
            scope.$apply();
          } });
        });

        var ccNumber = angular.element(document.getElementById('cc-number')).children();
        ccNumber.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.cvv = true;
            scope.$apply();
          } });
        });

        var ccCVV = angular.element(document.getElementById('cc-cvv')).children();
        ccCVV.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.expiration = true;
            scope.$apply();
          } });
        });

        var ccExpiration = angular.element(document.getElementById('cc-expiration')).children();
        ccExpiration.on('focus', function() {
          TweenMax.to(element, 0.5, { height: '600px', ease: Strong.easeInOut, onComplete: function() {
            scope.submit = true;
            scope.$apply();
          } });
        });

        // input.on('focus', function() {
        //   console.log('fuck pls work');
        //   ccValidation(ccElements);
        //   // TweenMax.to(element, 0.5, { height: '500px', ease: Strong.easeInOut, onComplete: function() {
        //   //   scope.ready = true;
        //   //   scope.$apply();
        //   // } });
        // });


        input.on('blur', function() {
          if (scope.creditCard.name || scope.creditCard.number ) {
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

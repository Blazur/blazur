(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.landing', {
        url: '/',
        templateUrl: 'scripts/home/landing/landing.tpl.html'
        // animation: {
        //   enter: 'slide-in-up',
        //   leave: 'slide-out-up',
        //   ease: 'back',
        //   speed: 500
        // }
      });
  }];
  angular.module('app.home.landing', [])
  .config(configBlock);
}());

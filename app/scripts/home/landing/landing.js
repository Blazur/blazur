(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.landing', {
        url: '/',
        controller: 'LandingController',
        templateUrl: 'scripts/home/landing/landing.tpl.html'
        // animation: {
        //   enter: 'slide-in-up',
        //   leave: 'slide-out-up',
        //   ease: 'back',
        //   speed: 500
        // }
      });
  }];
  angular.module('app.home.landing', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'LandingController',
    init: function() {
      this.$.reveal.color = 'primary';
    },
    inject: ['$scope']
  });
}());

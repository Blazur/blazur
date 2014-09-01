(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.how', {
        url: '/how-it-works',
        template: '<h1>How</h1>',
        controller: 'HowController'
        // animation: {
        //   enter: 'slide-in-up',
        //   leave: 'slide-out-up',
        //   ease: 'back',
        //   speed: 500
        // }
      });
  }];

  angular.module('app.home.how', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'HowController',

    inject: ['$scope'],

    init: function() {
      this.$.reveal.color = 'accent';
    }
  });
}());

(function() {
  'use strict';

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.faq', {
        url: '/faq',
        controller: 'FaqController',
        template: '<h1>FAQ</h1>'
      });
  }];

  angular.module('app.home.faq', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'FaqController',
    inject: ['$scope'],
    init: function() {
      this.$.reveal.color = 'accentDark';
    }
  });
}());

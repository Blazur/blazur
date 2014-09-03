(function() {
  'use strict';

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home.faq', {
        url: '/faq',
        controller: 'FaqController',
        templateUrl: 'scripts/home/faq/faq.tpl.html'
      });
  }];

  angular.module('app.home.faq', ['classy'])
  .config(configBlock)
  .classy.controller({
    name: 'FaqController',
    inject: ['$scope'],
    init: function() {
      this.$.reveal.color = 'primary';
    }
  });
}());

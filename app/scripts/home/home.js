(function() {
  'use strict';
  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home', {
        abstract: true,
        controller: 'HomeController',
        templateUrl: 'scripts/home/home.tpl.html'
      });
  }];

  angular.module('app.home', [
    'classy',
    'app.home.landing',
    'app.home.how',
    'app.home.faq',
    'app.home.directives',
    'ngFx'
  ])
  .config(configBlock)
  .constant('Rest', {
    url: 'http://localhost:4000'
  })
  .classy.controller({
    name: 'HomeController',

    inject: ['$scope'],

    init: function() {
      this.$.reveal = { color: 'primary' };
      this.$.coords = {};
      this.$.grow = { message: 'no'};
    },

    nevermind: function(){
      this.$.grow.message = 'reset';
      this.$.reveal.color = 'primary';
    }
  });
}());

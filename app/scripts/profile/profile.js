(function() {
  'use strict';
  var configBlock = ['$stateProvider',function(State) {
    State
      .state('app.profile', {
        url: '/profile',
        templateUrl: 'profile.html',
        controller: 'ProfileController',
        authenticate: true
      });
  }];

  angular.module('app.profile', [
    'classy',
    'app.profile.post',
    'app.profile.history'
  ])
  .config(configBlock)
  .classy.controller({
    name: 'ProfileController',

    init: function() {
      this.AuthFactory.getCurrentUser().$promise.then(function(user) {
        this.$.user = user;
        this.$.hasMessages = !!this.$.user.messages.length;
      }.bind(this));
    },

    goTo: function(state) {
      this.$state.go('app.profile.' + state);
    },

    inject: ['$scope', '$state', 'AuthFactory']
  });
}());

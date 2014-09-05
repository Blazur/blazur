(function() {
  'use strict';

  angular.module('app.home.directives.signinForm', [])
  .directive('signinForm', ['$templateCache', 'UserFactory', function(tCache, User) {
    function signinFormLinkFn(scope, element, attr) {
      scope.form = {
        emailAttrs: {
          'ng-maxlength': '12',
          'ng-minlength': '5',
          'required': 'true'
        }
      };

      scope.oauth = function(provider) {
        User.signinOauth(provider);
      };

    }
    return {
      restrict: 'EA',
      template: tCache.get('signinForm.html'),
      replace: true,
      scope: {},
      link: signinFormLinkFn
    };
  }]);
}());

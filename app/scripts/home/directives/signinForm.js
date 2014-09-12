(function() {
  'use strict';

  angular.module('app.home.directives.signinForm', [])
  .directive('signinForm', ['$templateCache', 'AuthFactory', function(tCache, Auth) {
    function signinFormLinkFn(scope, element, attr) {
      scope.form = {
        emailAttrs: {
          'ng-maxlength': '12',
          'ng-minlength': '5'
        }
      };

      scope.oauth = function(provider) {
        Auth.signinOauth(provider);
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

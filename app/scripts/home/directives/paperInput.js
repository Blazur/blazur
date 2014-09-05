(function(){
  'use strict';

  angular.module('app.home.directives.paperInput', [])
  .directive('paperInput', ['$templateCache', '$compile', function(tCache, compile) {
    function paperInputLinkFn(scope, element, attr) {
      scope.type = attr.type;
      // scope.$watchCollection('attrs', function(newVal, oldVal) {
      //   if (oldVal && newVal && angular.equals(newVal, oldVal)) {

      //   }
      // });
    }
    return {
      restrict: 'EA',
      template: tCache.get('paperInput.html'),
      replace: true,
      scope: {
        value: '=',
        attrs: '='
      },
      transclude: true,
      link: paperInputLinkFn
    };
  }]);
}());

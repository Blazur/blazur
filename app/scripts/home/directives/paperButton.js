(function() {
  'use strict';

  angular.module('app.home.directives.paperButton', [])
  .directive('paperButton', ['$timeout', '$compile', function(timeout, compile) {
    function paperButtonLinkFn(scope, element, attr) {
      var hasShadow = element.hasClass('raised');

      element.on('click', function() {
        if (hasShadow) {
          element.addClass('active');
          timeout(function() {
            element.removeClass('active');
          }, 300);
        }
      });

      scope.$on('$destroy', function() {
        element.off('click');
      });
    }

    return {
      template: '<button class="paper-button">{{ text }}</button>',
      transclude: true,
      restrict: 'EA',
      link: paperButtonLinkFn,
      replace: true,
      scope: {
        text: '@'
      }
    };
  }]);
}());

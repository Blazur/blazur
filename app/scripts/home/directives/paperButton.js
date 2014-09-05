(function() {
  'use strict';

  angular.module('app.home.directives.paperButton', [])
  .directive('paperButton', ['$timeout', '$compile', function(timeout, compile) {
    function paperButtonLinkFn(scope, element, attr) {
      var hasRipple = attr.ripple;
      var hasShadow = element.hasClass('raised');
      attr.$observe('disabled', function() {
        if (!attr.disabled && !hasRipple) {
          attr.$set('ripple', 'accent');
        }
      });
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
      template: '<div class="paper-button" ng-transclude></div>',
      transclude: true,
      restrict: 'EA',
      link: paperButtonLinkFn,
      replace: true
    };
  }]);
}());

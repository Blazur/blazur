(function(){
  'use strict';

  angular.module('app.home.directives.paperInput', [])
  .directive('paperInput', ['$templateCache', '$compile', function(tCache, compile) {
    function paperInputLinkFn(scope, element, attrs) {
      scope.type = attrs.type;
      scope.label = attrs.label;

    }
    return {
      restrict: 'EA',
      template: tCache.get('paperInput.html'),
      replace: true,
      scope: {
        value: '='
      },
      compile: function(element, attrs) {
        var ngValids = {
          'ngMaxlength': 'ng-maxlength',
          'ngMinlength': 'ng-minlength',
          'required': 'required'
        };
        var input = element.find('input');

        _.forEach(attrs, function(val, attr) {
          if (attr in ngValids) {
            if (ngValids[attr] === 'required') {
              input.attr('required', 'true');
            } else {
              input.attr(ngValids[attr], val || '');
            }
          }
        });
        return paperInputLinkFn;
      }
    };
  }]);
}());

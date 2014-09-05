/* jshint ignore:start */
describe('app.home.directives', function() {
  var trigger = function(element, event){
    element.triggerHandler(event);
  };
  /* Ripple directive */
  describe('ripple', function() {
    var $compile, element, $scope, $timeout;
    beforeEach(module('app.home.directives.ripple'));

    beforeEach(inject(function($injector, $timeout) {
      $timeout = $timeout;
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();
      element = '<div ripple></div>';
      element = $compile(element)($scope);
      $scope.$digest();
    }));

    it('should not have isolate scope', function() {
      expect(element.isolateScope()).to.be(undefined);
    });

    it('should add and remove ripple', function() {
      expect(element.children().length).to.be(0);
      trigger(element, 'mousedown');
      expect(element.children().length).to.be(1);
    });
  })
});
/* jshint ignore:end */

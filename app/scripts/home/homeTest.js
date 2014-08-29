/* jshint ignore:start */
describe('app.home module', function() {

  describe('HomeController', function() {
    var $scope, Home;

    beforeEach(module('ui.router'));
    beforeEach(module('app.home'));

    beforeEach(inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');
      $scope = $rootScope.$new();
      Home = $controller('HomeController', {
        $scope: $scope
      })
    }));

    it('should have a name property', function() {
      expect(Home.name).to.be.a('string');
    });
  })
});
/* jshint ignore:end */

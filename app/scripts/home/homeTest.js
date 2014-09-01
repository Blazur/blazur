/* jshint ignore:start */
describe('app.home module', function() {

  describe('HomeController', function() {
    var $scope, $state, Home;

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');
      var $templateCache = $injector.get('$templateCache');

      $templateCache.put('scripts/home/home.tpl.html', '');
      $templateCache.put('scripts/home/landing/landing.tpl.html', '');

      $state = $injector.get('$state');
      $scope = $rootScope.$new();

      Home = $controller('HomeController', {
        $scope: $scope
      })
    }));

    it('should have a name property', function() {
      expect(Home.name).to.be.a('string');
    });

    it('should have a app.home state', function() {
      $state.go('app.home.landing');
      $scope.$digest();
      var currentState = $state.current;

      expect(currentState.name).to.be('app.home.landing');
      expect(currentState.url).to.be('/');
      // expect(currentState.controller).to.be('HomeController');
      // expect(currentState.templateUrl).to.be('scripts/home/home.tpl.html');
    });
  })
});
/* jshint ignore:end */

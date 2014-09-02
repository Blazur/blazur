/* jshint ignore:start */
describe('app.home module', function() {

  describe('Home state', function() {
    var $scope, $state, getScope;

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');
      var $templateCache = $injector.get('$templateCache');

      $templateCache.put('scripts/home/home.tpl.html', '');
      $templateCache.put('scripts/home/landing/landing.tpl.html', '');
      $templateCache.put('scripts/home/faq/faq.tpl.html', '');
      $templateCache.put('scripts/home/how/how.tpl.html', '');

      $state = $injector.get('$state');
      $scope = $rootScope.$new();

      $controller('HomeController', {
        $scope: $scope
      });

      getScope = function(controller) {
        var scope = $scope.$new();
        $controller(controller, {
          $scope: scope
        });
        return scope;
      };

    }));

    describe('landing page', function() {

      it('should change header color to be "primary"', function() {
        var $scope = getScope('LandingController');
        $state.go('app.home.landing');
        $scope.$digest();
        var currentState = $state.current;

        expect(currentState.name).to.be('app.home.landing');
        expect(currentState.url).to.be('/');
        expect(currentState.controller).to.be('LandingController');
        expect(currentState.templateUrl).to.be('scripts/home/landing/landing.tpl.html');
      });

      it('should have properties for animations', function() {
        var $scope = getScope('LandingController');

        expect($scope.reveal.color).to.be('primary');
        expect($scope.coords).to.be.an('object');
      });
    });

    describe('faq page', function() {

      it('should have an app.home.faq state', function() {
        var $scope = getScope('FaqController');
        $state.go('app.home.faq');
        $scope.$digest();
        var currentState = $state.current;

        expect(currentState.name).to.be('app.home.faq');
        expect(currentState.url).to.be('/faq');
        expect(currentState.controller).to.be('FaqController');
        expect(currentState.templateUrl).to.be('scripts/home/faq/faq.tpl.html');
      });

      it('should change header color to be "primary dark"', function() {
        var $scope = getScope('FaqController');
        expect($scope.reveal.color).to.be('primaryDark');
      });

    });

    describe('how page', function() {

      it('should have an app.home.how state', function() {
        var $scope = getScope('HowController');
        $state.go('app.home.how');
        $scope.$digest();
        var currentState = $state.current;

        expect(currentState.name).to.be('app.home.how');
        expect(currentState.url).to.be('/how-it-works');
        expect(currentState.controller).to.be('HowController');
        expect(currentState.templateUrl).to.be('scripts/home/how/how.tpl.html');
      });

      it('should change header color to be "accent"', function() {
        var $scope = getScope('HowController');
        expect($scope.reveal.color).to.be('accent');
      });
    });
  })
});
/* jshint ignore:end */

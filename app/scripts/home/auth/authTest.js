/* jshint ignore:start */
describe('app.home.auth module', function() {

  describe('Auth state', function() {
    var $scope, $state, getScope;

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');
      var $templateCache = $injector.get('$templateCache');

      $templateCache.put('scripts/home/auth/join/join.tpl.html', '');
      $templateCache.put('scripts/home/auth/signin/signin.tpl.html', '');

      $state = $injector.get('$state');

      getScope = function(controller) {
        var scope = $rootScope.$new();
        $controller(controller, {
          $scope: scope
        });
        return scope;
      };

    }));

    describe('signin page', function() {

      it('should change header color to be "primary"', function() {
        var $scope = getScope('LandingController');
        $state.go('app.home.auth.signin');
        $scope.$digest();
        var currentState = $state.current;

        expect(currentState.name).to.be('app.home.auth.signin');
        expect(currentState.url).to.be('/signin');
        expect(currentState.controller).to.be('SigninController');
        expect(currentState.templateUrl).to.be('scripts/home/auth/signin/sighin.tpl.html');
      });
    });


  })
});
/* jshint ignore:end */

/* jshint ignore:start */
describe('app.user module', function() {

  describe('Auth', function() {
    var auth, $window, mockHTTP, $state, $rootScope, $cookieStore;

    beforeEach(function() {
      module('app');
      inject(function(AuthFactory, $injector, $httpBackend) {
        auth = AuthFactory;
        var $templateCache = $injector.get('$templateCache');
        $cookieStore = $injector.get('$cookieStore');
        $rootScope = $injector.get('$rootScope');

        mockHTTP = $httpBackend;
        $state = $injector.get('$state');
        $templateCache.put('scripts/home/home.tpl.html', '');
        $templateCache.put('scripts/home/landing/landing.tpl.html', '');
      });
    });

    it('should be an object', function() {
      expect(auth).to.be.an('object');
    });

    it('should let users signout and rediect to home', function() {
      expect(auth.signout).to.be.a('function');
      $cookieStore.put('__devkeep','1234');

      auth.signout();
      $rootScope.$digest();
      expect($cookieStore.get('__devkeep')).to.not.be.ok();
      expect($state.current.name).to.be('app.home.landing');
    });

    xit('should know when a user is signed in', function() {
      expect(auth.isSignedIn).to.be.a('function');
      $cookieStore.put('__devkeep', '1234');

      var cb1 = function(isSignedIn) {
        expect(isSignedIn).to.be(true);
      };

      var cb2 = function(isSignedIn) {
        expect(isSignedIn).to.be(false);
      };

      auth.isSignedIn(cb1);
      auth.signout();

      $rootScope.$digest();
      auth.isSignedIn(cb2)
    });
  })
});
/* jshint ignore:end */

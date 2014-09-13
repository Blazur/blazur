/* jshint ignore:start */
describe('app.user module', function() {

  describe('User', function() {
    var user, $window, mockHTTP, $state, $rootScope, $cookieStore;

    beforeEach(function() {
      module('app');
      inject(function(AuthFactory, $injector, $httpBackend) {
        user = AuthFactory;
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
      expect(user).to.be.an('object');
    });

    it('should let users signout and rediect to home', function() {
      expect(user.signout).to.be.a('function');
      $cookieStore.put('__devkeep','1234');

      user.signout();
      $rootScope.$digest();
      expect($cookieStore.get('__devkeep')).to.not.be.ok();
      expect($state.current.name).to.be('app.home.landing');
    });

    it('should know when a user is signed in', function() {
      expect(user.isSignedIn).to.be.a('function');
      $cookieStore.put('__devkeep', '1234');

      expect(user.isSignedIn()).to.be(true);

      user.signout();

      expect(user.isSignedIn()).to.be(false);
    });
  })
});
/* jshint ignore:end */

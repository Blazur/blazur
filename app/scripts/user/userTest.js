/* jshint ignore:start */
describe('app.user module', function() {

  describe('User factory', function() {
    var User, $window, mockHTTP, $state, $rootScope;

    beforeEach(function() {
      module('app');

      inject(function(UserFactory, $injector, $httpBackend) {
        User = UserFactory;
        var $templateCache = $injector.get('$templateCache');
        $window = $injector.get('$window');
        $rootScope = $injector.get('$rootScope');
        mockHTTP = $httpBackend;
        $state = $injector.get('$state');
        $templateCache.put('scripts/home/home.tpl.html', '');
        $templateCache.put('scripts/home/landing/landing.tpl.html', '');
      });
    });

    it('should be an object', function() {
      expect(User).to.be.an('object');
    });

    it('should let users signout and rediect to home', function() {
      expect(User.signout).to.be.a('function');
      $window.localStorage.setItem('bz','1234');

      User.signout();
      $rootScope.$digest();
      expect($window.localStorage.getItem('bz')).to.not.be.ok();
      expect($state.current.name).to.be('app.home.landing');
    });

    it('should know when a user is signed in', function() {
      expect(User.isSignedIn).to.be.a('function');
      $window.localStorage.setItem('bz', '1234');

      expect(User.isSignedIn()).to.be(true);

      User.signout();

      expect(User.isSignedIn()).to.be(false);
    });
  })
});
/* jshint ignore:end */

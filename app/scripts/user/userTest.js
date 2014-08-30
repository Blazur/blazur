/* jshint ignore:start */
describe('app.user module', function() {

  describe('User factory', function() {
    var User, $window, mockHTTP

    beforeEach(function() {
      module('app.user.services');

      inject(function(UserFactory, $injector, $httpBackend) {
        User = UserFactory;
        $window = $injector.get('$window');
        mockHTTP = $httpBackend;
      });
    });

    it('should be defined', function() {
      expect(User).to.be.an('object');
    });

    xit('should let users signout', function() {
      expect(User.signout).to.be.a('function');
      $window.localStorage.setItem('bz','1234');

      User.signout();
      expect($window.localStorage.getItem('bz')).to.not.be.ok();
    });

    xit('should know when a user is signed in', function() {

    });
  })
});
/* jshint ignore:end */

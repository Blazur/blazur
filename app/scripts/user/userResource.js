(function() {
  'use strict';

  angular.module('app.user.resource', [])
  .factory('User', ['$resource', 'API', function($resource, API){
    return $resource(API.url + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }]);
}());

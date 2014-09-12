(function() {
  'use strict';

  angular.module('app.user.resource', ['ngResource'])
  .factory('User', ['$resource', 'API', function($resource, API){
    console.log(API)
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

angular.module('auth', [])
.controller('AuthController', function($scope, $window, $location, Auth){

})
.factory('Auth', function($http, $location, $window) {
  var testFn = function(){
    console.log("HERE!");
  }
  return {testFn: testFn};
});
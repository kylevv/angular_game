angular.module('auth', [])
.controller('AuthController', function($scope, $window, $location, Auth){

})
.factory('Auth', function($http, $location, $window) {
  var signin = function (user) {

  };

  var signup = function (user) {

  };

  var hasSession = function () {
    return !!$window.localStorage.getItem('com.jqss');
  };

  var signout = function () {

  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    hasSession: hasSession
  };
});
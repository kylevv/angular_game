angular.module('auth', [])
.controller('AuthController', function($scope, $window, $location, Auth){
  $scope.user = {};
  $scope.signin = function(){
    Auth.signin($scope.user, Auth.handleResponse, Auth.handlerError);
  };
  $scope.signup = function(){
    Auth.signup($scope.user, Auth.handleResponse, Auth.handlerError);
  }

})
.factory('Auth', function($http, $location, $window) {
  var signin = function (user, successCB, errCB) {
    $http.get('/signin')
      .then(successCB, errCB);
  };

  var signup = function (user) {
    $http.post('/signup', user)
      .then(successCB, errCB);
  };

  var hasSession = function () {
    return !!$window.localStorage.getItem('com.jqss');
  };

  var signout = function () {

  };

  var handleResponse = function(token) {

  };

  var handlerError = function(err) {

  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    hasSession: hasSession,
    handleResponse: handleResponse,
    handlerError: handlerError
  };
});
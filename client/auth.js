angular.module('auth', [])

.controller('AuthController', function($scope, Auth){
  $scope.user = {};
  $scope.signin = function(){
    Auth.signin($scope.user, Auth.handleResponse, Auth.handleError);
  };
  $scope.signup = function(){
    Auth.signup($scope.user, Auth.handleResponse, Auth.handleError);
  }
})

.factory('Auth', function($http, $location, $window, $rootScope) {

  var signin = function (user, successCB, errCB) {
    $http.post('/api/signin', user)
      .then(successCB, errCB);
  };

  var signup = function (user, successCB, errCB) {
    $http.post('/api/signup', user)
      .then(successCB, errCB);
  };

  var hasSession = function () {
    return !!$window.localStorage.getItem('com.jqss');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.jqss');
    $location.path('/signin');
  };

  var handleResponse = function(resp) {
    $window.localStorage.setItem('com.jqss', resp.data.token);
    $rootScope.username = resp.data.username;
    $rootScope.bestScore = resp.data.score;
    $location.path('/game');
  };

  var handleError = function(err) {
    console.error("ajax error: ", err);
  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    hasSession: hasSession,
    handleResponse: handleResponse,
    handleError: handleError
  };
});
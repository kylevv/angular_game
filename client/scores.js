angular.module('scores', [])

.controller('ScoresController', function($scope, ScoreKeeper, Auth){

  $scope.records = [];

  $scope.getScores = function(){
    ScoreKeeper.getScores(function(resp){
      $scope.records = resp.data;
    }, ScoreKeeper.handleErr);
  }
  $scope.getScores();;

  $scope.signout = function(){
    Auth.signout();
  }
})

.factory('ScoreKeeper', function($http){
  var getScores = function(successCB, errCB){
    $http.get('/api/scores')
      .then(successCB, errCB);
  };

  var handleErr = function(err){
    console.error("ajax error: ", err);
  };

  return {
    getScores: getScores,
    handleErr: handleErr
  };
});


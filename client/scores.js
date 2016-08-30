angular.module('scores', [])

.controller('ScoresController', function($scope, ScoreKeeper, Auth){

  $scope.records = [];

  $scope.getScores = function(){
    ScoreKeeper.getScores(function(resp){
      $scope.records = resp.data.map(function(record, index){
        record.rank = index+1;
        return record;
      });
    }, Auth.handleError);
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

  return {
    getScores: getScores
  };
});


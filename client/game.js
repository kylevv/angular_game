angular.module('game', [])
.controller('GameController', function($scope, GamePlay){

  // $scope.points = GamePlay.points;
  // $scope.time = GamePlay.time;
  $scope.scoreboard = GamePlay.scoreboard;
  $scope.enemies = GamePlay.enemies;

  $scope.startgame = function(){
    console.log("STARTING");
    GamePlay.startgame();
  }
})

.factory('GamePlay', function($interval) {
  var scoreboard = {
    points: 0,
    time: 0
  };
  var enemies = [];
  var duration = 20000; //seconds

  var startgame = function(){
    scoreboard.points = 0;
    scoreboard.time = 20;
    enemies.length=0;
    $interval(function(){
      // console.log(scoreboard.time);
      scoreboard.time--;
      // if (Math.floor(Math.random()*4)<1) {
      //   scoreboard.points++;
      // }
      enemies.push(new Enemy);
    },1000,20);
  };

  var Enemy = function(){
    this.left = Math.floor(Math.random()*200);
    this.top = Math.floor(Math.random()*200);
  }

  return {
    startgame: startgame,
    scoreboard: scoreboard,
    enemies: enemies
  };
})

.directive('myCart', function($document){

  function link (scope, element, attr) {
    var x=150;
    var y=150;
    element.css({left:x+"px",top:y+"px"});

    $document.on('keydown', function(event){
      // event.preventDefault();
      if (event.which===39) {
        x+=20;
      }
      if (event.which===37) {
        x-=20;
      }
      if (event.which===38) {
        y-=20;
      }
      if (event.which===40) {
        y+=20;
      }
      element.css({left: x+"px", top: y+"px"});

      var i=0;
      while (i<scope.enemies.length) {
        if (scope.enemies[i].left>x+40 || scope.enemies[i].left+20<x || scope.enemies[i].top>y+40 || scope.enemies[i].top+20<y){
          //do nothing
        } else {
          scope.enemies.splice(i,1);
          scope.scoreboard.points++;
          i--;
          scope.$apply();
        }
        i++;
      }

    });


  };

  return {link: link};
});
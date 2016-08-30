angular.module('game', [])

.controller('GameController', function($scope, GamePlay, Auth){

  // $scope.points = GamePlay.points;
  // $scope.time = GamePlay.time;
  $scope.scoreboard = GamePlay.scoreboard;
  $scope.enemies = GamePlay.enemies;

  $scope.startgame = function(){
    console.log("STARTING");
    GamePlay.startgame();
  }

  $scope.signout = function(){
    Auth.signout();
  }
})

.factory('GamePlay', function($interval) {
  var scoreboard = {
    points: 0,
    time: 0
  };
  var enemies = [];
  var duration = 20000; //seconds
  var gravity = 0.25;

  var startgame = function(){
    scoreboard.points = 0;
    scoreboard.time = 20;
    enemies.length=0;
    $interval(function(){
      scoreboard.time=scoreboard.time-0.5;
      enemies.push(new Enemy);
    },500,40);
    $interval(function(){
      enemies.forEach(function(enemy){
        enemy.fall();
      });
    },50,400);
  };

  var Enemy = function(){
    this.left = Math.floor(Math.random()*460)+10;
    this.top = Math.floor(Math.random()*200);
    this.speed = 0;
  }
  Enemy.prototype.fall = function(){
    this.speed+=gravity;
    this.top+=this.speed;
  }

  return {
    startgame: startgame,
    scoreboard: scoreboard,
    enemies: enemies
  };
})

.directive('myCart', function($document, $interval){

  function link (scope, element, attr) {
    var x=250;
    var y=500;
    var leftKey = false;
    var rightKey = false;
    element.css({left:x+"px",top:y+"px"});

    $document.on('keydown', function(event){
      if (event.which===39) {
        rightKey = true;
      }
      if (event.which===37) {
        leftKey = true;
      };
    });

    $document.on('keyup', function(event){
      if (event.which===39) {
        rightKey = false;
      }
      if (event.which===37) {
        leftKey = false;
      }
    });

    var cartInterval = $interval(function(){
      if (leftKey) {
        x-=2;
      }
      if (rightKey) {
        x+=2;
      }

      element.css({left: x+"px", top: y+"px"});

      var i=0;
      while (i<scope.enemies.length) {
        if (scope.enemies[i].left>x+40 || scope.enemies[i].left+20<x || scope.enemies[i].top>y+40 || scope.enemies[i].top+30<y){
          //do nothing
        } else {
          scope.enemies.splice(i,1);
          scope.scoreboard.points++;
          i--;
        }
        i++;
      }

    }, 10);

    element.on('$destroy', function() {
      $interval.cancel(cartInterval);
    });
  };


  return {link: link};
});
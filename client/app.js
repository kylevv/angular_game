angular.module('jqss',[
  'auth',
  'ui.router',
  'game'
  // 'scores'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/game");

  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: '',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html',
      controller: 'AuthController'
    })
    .state('game', {
      url: '/game',
      templateUrl: 'game.html',
      controller: 'GameController'
    })
    .state('scores', {
      url: '/scores',
      templateUrl: '',
      controller: 'ScoresController'
    });

  // $routeProvider
  //   .when('/signin', {
  //     templateUrl: '',
  //     controller: 'AuthController'
  //   })
  //   .when('/signup', {
  //     templateUrl: 'signup.html',
  //     controller: 'AuthController'
  //   })
  //   .when('/game', {
  //     templateUrl: '',
  //     controller: 'GameController'
  //   })
  //   .when('/scores', {
  //     templateUrl: '',
  //     controller: 'ScoresController'
  //   })
  //   .otherwise({
  //     redirectTo: '/signup'
  //   });

    // $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function($window) {

})
.run(function($rootScope, $location, Auth){
  Auth.testFn();
});
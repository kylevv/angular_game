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

    $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function($window) {
  var attach {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.jqss');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  }
  return attach;
})

.run(function($rootScope, $location, Auth){
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.hasSession()) {
      $location.path('/signin');
    }
  })
});
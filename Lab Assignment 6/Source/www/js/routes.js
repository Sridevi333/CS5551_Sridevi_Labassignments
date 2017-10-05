angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/page1',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page2',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('home', {
    url: '/page3',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('joinClass', {
    url: '/page4',
    templateUrl: 'templates/joinClass.html',
    controller: 'joinClassCtrl'
  })

  .state('topVideos', {
    url: '/page5',
    templateUrl: 'templates/topVideos.html',
    controller: 'topVideosCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});
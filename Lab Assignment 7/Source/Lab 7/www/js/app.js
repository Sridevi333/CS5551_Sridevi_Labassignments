// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','firebase','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("firebase", {
        url: "/firebase",
        templateUrl: "templates/firebase.html",
        controller: "FirebaseController",
        cache: false
      })
      .state("secure", {
        url: "/secure",
        templateUrl: "templates/secure.html",
        controller: "SecureController"
      });
    $urlRouterProvider.otherwise('/firebase');
  })
.controller("FirebaseController", function($scope, $state, $firebaseAuth) {

  var fbAuth = $firebaseAuth();

  $scope.login = function(username, password) {
    fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
      $state.go("secure");
    }).catch(function(error) {
      console.error("ERROR: " + error);
    });
  }

  $scope.register = function(username, password) {
    fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
      return fbAuth.$signInWithEmailAndPassword(username,
        password);
    }).then(function(authData) {
      $state.go("secure");
    }).catch(function(error) {
      console.error("ERROR: " + error);
    });
  }

});

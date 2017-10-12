angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
$scope.openInAppBrowser = function()
{
 // Open in app browser
 window.open('http://google.com','_blank');
};
}])

.controller('joinClassCtrl', function ($scope, $http) {
        $scope.venueList = new Array();
        //$scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("placeName").value;
            var searchQuery = document.getElementById("interestName").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
                document.getElementById('listView').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=J5Y2UOY5JEQW4QKX2WXBZG4QNAGUZXWIOHLEILLV5SYASEYF" +
                    "&client_secret=UQJCVOYU4MF43X2VIXSIV1HULDYAQOEZW0CZSJ242ROVER43" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);
                handler.success(function (data) {

                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        for (var i = 0; i < data.response.venues.length; i++) {
                            $scope.venueList[i] = {
                                "name": data.response.venues[i].name,
                                "id": data.response.venues[i].id,
                                "location": data.response.venues[i].location
                            };
                        }
                    }

                })

            }
        }
        $scope.getReviews = function (venueSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
                    "?sort=recent" +
                    "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
                    "&limit=5");
                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.tips != null &&
                        result.response.tips.items != null) {
                        $scope.mostRecentReview = result.response.tips.items[0];
                        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                            "&outputMode=json&text=" + $scope.mostRecentReview.text);
                        callback.success(function (data) {
                            if(data!=null && data.docSentiment!=null)
                            {
                                $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
                                                            "sentiment":data.docSentiment.type,
                                                             "score":data.docSentiment.score  };
                                document.getElementById('listView').style.display = 'block';


                            }
                        })
                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }



})

.controller('topVideosCtrl', function($scope, $http){
    $scope.videos = [];
    $scope.videoSearch =function () {
    var queryKeyword = document.getElementById("queryName").value;
    $scope.youtubeParams = {
      key: 'AIzaSyDpyT6qTD9Ql3WcG62wYkjqLdq9IRpmPrA',
       // q:encodeURIComponent(document.getElementById("queryName").value).replace(/%20/g,'+'),
      type: 'video',
      maxResults: '6',
      part: 'snippet',
        q:queryKeyword,
      order: 'viewCount',
      channelId: 'UCeI5UUTe_3kIVNxDqgcnFEg',
    }

    $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q='+queryKeyword+'&type=video&key=AIzaSyDpyT6qTD9Ql3WcG62wYkjqLdq9IRpmPrA').success(function(response){
      angular.forEach(response.items, function(child){
       // console.log (child);
           $scope.videos.push(child);
      });
    });
    }

})
  .controller('LoginCtrl', function($scope, $rootScope, $timeout, $stateParams, Auth, ionicMaterialInk, $ionicLoading, $ionicPopup) {
    $scope.user = {
      email: "",
      password: ""
    };

    $scope.$parent.clearFabs();
    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.validateUser = function() {
      $rootScope.showLoading('Logging you in...');

      Auth.loginWithEmail(this.user.email, this.user.password)
        .then(function(user) {
          //do nothing and wait for onAuth

        }, function(error) {
          var errMsg = '';

          if (error.code == 'INVALID_EMAIL' || error.code == 'INVALID_PASSWORD') {
            errMsg = 'Invalid Email/Password combination';
          }
          else if (error.code == 'INVALID_USER') {
            errMsg = 'Invalid User';
          }
          else {
            errMsg = 'Oops something went wrong. Please try again later';
          }

          $rootScope.hideLoading();

          $rootScope.alert('<b><i class="icon ion-person"></i> Login error</b>', errMsg);
        });
    }

    $scope.oauthLogin = function(provider) {
      if(provider=='facebook') {
        Auth.loginWithFacebook()
          .then(function(authData) {
            $rootScope.clog('oauthLogin');
          })
          .catch(function(error) {
            $rootScope.clog('Oops something went wrong. Please try again later');
            console.dir(error);
          });
      }
      else if (provider=='google') {
        Auth.loginWithGoogle()
          .then(function(authData) {
            $rootScope.clog('oauthLogin');
          })
          .catch(function(error) {
            $rootScope.clog('Oops something went wrong. Please try again later');
            $rootScope.clog(error);
          });
      }
      else if (provider=='twitter') {
        Auth.loginWithTwitter()
          .then(function(authData) {
            $rootScope.clog('oauthLogin');
          })
          .catch(function(error) {
            $rootScope.clog('Oops something went wrong. Please try again later');
            $rootScope.clog(error);
          });
      }
      else {
        $rootScope.hideLoading();
      }
    };

    $scope.testAppWithoutLogin = function(){
      $scope.user = {
        email: "test@testings.com",
        password: "test"
      };

      $scope.validateUser();
    }
  })
  .controller('ListCtrl', function($scope, $rootScope, $stateParams, $timeout, $firebaseObject, Groups, Users, ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $http) {
    $scope.ime = $stateParams.ime;

    $scope.groupId = $stateParams.id;
    Groups.setCurrentGroupId($scope.groupId);

    $scope.items = {};
    $scope.total = 0;

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('right');

    // Delay expansion
    /*$timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);*/

    $timeout(function () {
      $scope.showFabButton = true;
    }, 900);

    // Set Motion
    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);*/

    $rootScope.showLoading("Loading data...");

    // Set Ink
    ionicMaterialInk.displayEffect();

    var syncGroupItems = $firebaseObject(Groups.GroupItems($scope.groupId));
    syncGroupItems.$bindTo($scope, "items");

    syncGroupItems.$loaded(
      function (data) {
        $scope.calcTotals();
        $rootScope.hideLoading();
      },
      function (error) {
        console.error("Error:", error);
        $rootScope.hideLoading();
      }
    );

    syncGroupItems.$watch(function (snap, snap2) {
      $scope.calcTotals();
    });

    $scope.Remove = function (item) {
      Groups.GroupItem($scope.groupId, item).remove(function (err) {
        if (err) {
          console.error(err);
        }
      });
    };

    $scope.CheckOrUncheck = function (item) {
      Groups.GroupItem($scope.groupId, item)
        .transaction(
          function (currentData) {
            if (currentData !== null) {
              currentData.isCompleted = !currentData.isCompleted;
              currentData.updated = Firebase.ServerValue.TIMESTAMP;
              return currentData;
            } else {
              return; // Abort the transaction.
            }
          },
          function (error, committed, snapshot) {
            if (error) {
              $rootScope.clog('Transaction failed abnormally!', error);
            } else if (!committed) {
              $rootScope.clog('No data.');
            } else {
              $rootScope.clog('Updated!');
            }
            if (snapshot) {
              $rootScope.clog("New data: ", snapshot.val());
            }
          }
        );
    };
  })

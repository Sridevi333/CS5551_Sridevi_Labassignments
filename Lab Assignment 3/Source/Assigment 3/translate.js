var app=angular.module("Translate",[]);
app.controller("Translatecontroller",function ($scope,$http) {
    $scope.translate = function () {
        var word = document.getElementById('pac-input').value;
        var language = document.getElementById('lang').value;
        $http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170911T180133Z.54a4578d96adf730.7837f987d265df0b1d6901bd1c716007498e5bd9&text=' + word + '&lang=' + language).success(function (data) {
            console.log(data);
            $scope.output = data.text;
        })
    }
})
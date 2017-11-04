var app=angular.module("Sentiment",[]);
app.controller("Sentimentctrl",function ($scope,$http) {
    $scope.findSentiment = function () {
        var words = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&text=" + final_transcript)
        words.success(function (data) {
            console.log(data);
            $scope.Sentimentwithlang={"sentiment":data.docSentiment.type,"score":data.docSentiment.score
                ,"language":data.language};
            document.getElementById('div_List').style.display = 'block';
        });
    }
});
var express = require('express');
var app = express();
var request = require('request');
app.get('/getdata', function (req, res) {
    var result={
        'body': []
    };

    request('http://access.alchemyapi.com/calls/info/GetAPIKeyInfo?apikey=fcff12e9ce3b2504d329e67bc8dafb0861d1d812'+req.params.id, function (error,response,body) {
        
                return console.log('Error:', error);
            }

            if (response.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }

            body1 = JSON.parse(body1);
            weath = body1;

            result.body.push({"positive": data.positive,"negative": data.negative});

            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();

        });
    });

})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

})

var ws = require("nodejs-websocket");
var five = require("johnny-five");
var board = new five.Board();
var express = require('express');
var app = express();
var path = require('path');
var connectionSocket = null;
var counter = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    connectionSocket = conn;
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(8001);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

board.on("ready", function() {
    ///HOOK OTHER SIDE INTO GROUND ASK ALI
    var button = new five.Button({
        pin: 2,
        isPullup: true
    });

    button.on("up", function(value) {
        if(null !==connectionSocket  ) {
            counter += 1;
            connectionSocket.sendText(JSON.stringify({number: counter, takePicture: true}));
        }
    });

});
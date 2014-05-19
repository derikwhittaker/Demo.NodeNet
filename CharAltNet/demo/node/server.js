var express = require('express');
var socketIo = require('socket.io');

var port = process.env.port || 1337;
var app = express();

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = socketIo.listen(server);

var controllers = require('./controllers');
controllers({
    app: app,
    express: express,
    io: io
});

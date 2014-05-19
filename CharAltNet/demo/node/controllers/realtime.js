(function(realtimeController) {

    var io;
    var socketConnection = function(socket) {
        console.log('New Connection ' + socket.id);

        socket.emit('onConnected', { connectionId: socket.id });

        socket.on('clearLogs', clearLogs);
    };

    var clearLogs = function(data) {
        io.sockets.emit('onClearLogs');
    };

    realtimeController.init = function(options) {
        io = options.io;

        console.log('[Realtime Controller] Init was called');

        io.sockets.on('connection', socketConnection);

    };

})(module.exports);
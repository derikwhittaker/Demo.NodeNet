var client;
(function (client) {
    // Class
    var mainViewModel = (function () {
        function mainViewModel() {
            var self = this;
            this.hostUrl = "http://localhost:1337";
            //this.hostUrl = "http://prdcnodedemo.azurewebsites.net/";
            this.connectionId = "";
            this.socketConnection = io.connect(this.hostUrl);
            this.logs = ko.observableArray([]);
            
            this.setupCallbacks(this.socketConnection);

            $('#clearLogs').click(function() {
                self.socketConnection.emit('clearLogs', {});                
            });
        }
        
        mainViewModel.prototype.setupCallbacks = function (socketConnection) {
            var self = this;

            socketConnection.on('onConnected', function(data) {
                console.log(data);
                self.connectionId = data.connectionId;
                self.logs.removeAll();
            });

            socketConnection.on('onNewLog', function(data) {
                console.log('onNewLog ' + data);
                self.logs.push(data.body);
            });

            socketConnection.on('onClearLogs', function() {
                self.logs.removeAll();
            });

        };

        return mainViewModel;
    })();
    client.mainViewModel = mainViewModel;


})(client || (client = {}));


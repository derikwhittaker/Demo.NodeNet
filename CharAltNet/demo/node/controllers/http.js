(function(httpController) {
    var appPointer;
    var ioPointer;
    var bodyParser = require('body-parser');

    var indexGet = function(req, res) {
        //res.send('Hello World... Node Mon');
        res.render('index.html');
    };

    var indexPost = function (req, res) {
        console.log(req.body);
        //res.send(200, { resopnse: 'ok' });
        if (req.body) {
            ioPointer.sockets.emit('onNewLog', req.body);
            res.send(200, { resopnse: 'ok' });
        } else {
            res.send(400);
        }
    };

    var catchAllGet = function(req, res) {
        res.send('<a href="https://www.destroyallsoftware.com/talks/wat">Wat???</>', 404);
    }

    var configureExpress = function(app, express) {
        app.use(bodyParser());

        app.set('views', + __dirname + '/../views');
        app.engine('html', require('ejs').renderFile);

        app.use('/css', express.static(__dirname + '/../views/css'));
        app.use('/js', express.static(__dirname + '/../views/js'));
        app.use('/vm', express.static(__dirname + '/../views/vm'));
    }

    httpController.init = function(options) {
        appPointer = options.app;
        ioPointer = options.io;

        console.log('[Http Controller] Init was called');

        configureExpress(options.app, options.express);
        
        appPointer.get('/', indexGet);
        appPointer.post('/', indexPost);
        appPointer.get('*', catchAllGet);

    };

})(module.exports);
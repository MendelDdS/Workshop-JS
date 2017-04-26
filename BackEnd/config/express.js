var express = require("express");
var load = require('express-load');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

var fs = require('fs');
var http = require('http');
var https = require('https');

module.exports = function () {

    var usingHttps = false; ///   HTTP (false) / HTTPS (true)

    if (usingHttps) {

        var privateKey = fs.readFileSync('credentials/serverenc.key');
        var certificate = fs.readFileSync('credentials/9b94bb772d81146e.crt');
        var ca = fs.readFileSync('credentials/gd_bundle-g2-g1.crt');

        var credentials = {key: privateKey, cert: certificate, ca: ca, passphrase: 'embedded'};
    }

    var app = express();

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use(session(
        {
            secret: '0dc529ba-5051-4cd6-8b67-c9a901bb8bdf',
            resave: false,
            saveUninitialized: false
        }));

    app.use(cors({credentials: true}));

    // middleware
    app.use(express.static('./public'));
    app.use(express.static('./views'));

    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.set('views', './views');

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.use('/', require('../controllers/index'));

    if (usingHttps) {

        var httpsServer = https.createServer(credentials, app);

        var io = require('socket.io').listen(httpsServer);

        httpsServer.listen(8081, function () {
            console.log('HTTPS Virtus application listening on port 8081!');
        });

    } else {

        var server = app.listen(8081, function () {
            console.log('Virtus application listening on port 8081!');
        });

        var io = require('socket.io').listen(server);
    }

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;

};


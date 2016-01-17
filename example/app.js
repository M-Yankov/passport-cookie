'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    router = new express.Router(),
    port = 3001;

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// of course mongodb and mongoose are better storage.
var dataBase = [];

var home = require('./home');

require('./passport-config')(dataBase);
require('./router')(app, dataBase);

app.get('/home', function (req, res) {
    res.append('content-type', 'text/html');
    res.send(home.html);
});

app.get('/*', function (req, res) {
    res.redirect('/home');
});

app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});


'use strict';

var router = new require('express').Router(),
    passport = require('passport'),
    generator = require('./generators'),
    cookieAuthKey = require('../src/passport-cookie').key();

module.exports = function (app, dataBase) {

    router.get('/profile', passport.authenticate('cookie', {
        session: false
    }), function (req, res) {
        res.json(req.user);
    });

    router.post('/register', function (req, res) {
        // validations
        dataBase.push({
            username: req.body.username,
            password: req.body.password
        });

        res.append('content-type', 'text/html');
        res.json(req.body.username + ' has been registered, now should login. <br/> <a href="/home">Login</a>');
    });

    router.post('/login', function (req, res) {

        for (var i = 0; i < dataBase.length; i += 1) {
            if (dataBase[i].username === req.body.username &&
                dataBase[i].password === req.body.password) {

                if (!dataBase[i].token) {
                    dataBase[i].token = generator.generateRandomToken();
                }

                var user = dataBase[i];
                res.cookie(cookieAuthKey, user.token);
                res.send('Welcome ' + user.username);
                return;
            }
        }

        res.send('User not found!');
    });

    router.post('/logout', function (req, res) {
        req.logout();
        res.clearCookie(cookieAuthKey);
        res.send('Success logout!');
    });

    app.use('/auth/', router);
};

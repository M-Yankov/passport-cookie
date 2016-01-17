'use strict';

var passport = require('passport'),
    CookieStrategy = require('../src/passport-cookie');

module.exports = function (data) {
    passport.use(new CookieStrategy(function (token, done) {
        var user = data.filter(function (element, index, array) {
            return element.token === token;
        })[0];

        if (!user) {
        	return done({message: 'Not found!'}, null);
        }

        done(null, user);
    }));
};

//// if you use a mongodb and mongoose
//passport.use(new CookieStrategy(function (token, done) {
//    User.findOne({token: token})
//        .exec(function (err, user) {
//            if (err) {
//                return done(err, null);
//            }
//
//            done(null, user);
//        });
//}));


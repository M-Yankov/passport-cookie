# passport-cookie Strategy
authentication with cookies
 
### Description
 It's same library as passport-http-bearer. Difference is that authentication is implemented with cookies.
 No special headers needed while browser sends cookies with any request. 

### Setup
  * Before using, additional setup should be done. [cookie-parser](https://github.com/expressjs/cookie-parser) is required:
 ```js 
     var express = require('express');
     var cookieParser = require('cookie-parser');
     var app = express();
     app.use(cookieParser());
 ```
 
 * [passport](https://github.com/jaredhanson/passport) should be installed and configured.
 ```js
     passport.use(new CookieStrategy(function (token, done) {
         User.findOne({token: token})
             .exec(function (err, user) {
                 if (err) {
                     return done(err, null);
                 }
                 done(null, user);
             });
 ```
 As a first parameter it can be passed an object with property `key`, which sets the key of the cookie, to authorize. If not provided default key is set `Authorization`.
 `new CookieStrategy( {key: 'my-custom-key'}, function(token, done) { ... }`
 
 * Access to the key:
 ```js
    var cookieAuthKey = require('../src/passport-cookie').key();
 ```
 
 * On login(or whatever public route) set the cookie to the client.
 ```js
    router.post('/login', function (req, res) {
            // code... 
            res.cookie(cookieAuthKey, user.token);
            res.send('Welcome ' + user.username);
    });            
 ```
 
 * Set to any route middleware like this and will have access to `req.user`. If this middleware does'n exits, `req.user`
 will be __undefined__.
 ```js
     router.get('/profile', passport.authenticate('cookie', { session: false }), function (req, res) {
             res.json(req.user);
         });
 ``` 
 
 * To clear cookie 
 ```js
    router.post('/logout', function (req, res) {
            req.logout();
            res.clearCookie(cookieAuthKey);
            res.send('Success logout!');
        });
 ```
 
 * __Warning__ while making configuration, passport strategy should be configured before routes.
 
### Example
 open `cmd` on windows and navigate to `example` folder
 
 * [Link](http://example.com)
 
 * ..\passport-cookie\example> npm install
 * ..\passport-cookie\example> npm start
    * the example uses an array for storage (on server restart it loses data). Instead you can use a `mongodb` and `mongoose` 
    * _before start, make sure cookies on client are cleared for domain: localhost, else on /auth/profile you will see [object Object]_
 
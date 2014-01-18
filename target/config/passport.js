(function() {
  'use strict';
  var FacebookStrategy, User, authTokens;

  FacebookStrategy = require('passport-facebook').Strategy;

  authTokens = require('./auth');

  User = require('../models/user');

  module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
      console.log('passport', user);
      return done(null, {
        '_id': user._id,
        'name': user.name
      });
    });
    passport.deserializeUser(function(id, done) {
      return User.findById(id._id, function(err, user) {
        console.log('deserializeUser', id);
        return done(err, user);
      });
    });
    return passport.use(new FacebookStrategy({
      clientID: authTokens.facebook.clientID,
      clientSecret: authTokens.facebook.clientSecret,
      callbackURL: authTokens.facebook.callbackUrl
    }, function(accessToken, refreshToken, profile, done) {
      return process.nextTick(function() {
        return User.findOne({
          'facebook.id': profile.id
        }, function(err, user) {
          var newUser;
          if (err) {
            done(err);
          }
          if (user) {
            console.log('returning user');
            return done(null, user);
          } else {
            console.log('new user');
            newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.name = profile.displayName;
            newUser.username = profile.username;
            return newUser.save(function(err) {
              if (err) {
                console.log('err svaing new user', err);
                return err;
              } else {
                console.log(newUser);
                return done(null, newUser);
              }
            });
          }
        });
      });
    }));
  };

}).call(this);

//# sourceMappingURL=../../target/config/passport.js.map

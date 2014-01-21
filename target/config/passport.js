(function() {
  var FitbitStrategy, auth, passport;

  passport = require('passport');

  FitbitStrategy = require('passport-fitbit');

  auth = require('./auth');

  passport.use('fitbit', new FitbitStrategy({
    consumerKey: auth.fitbit.consumerKey,
    consumerSecret: auth.fitbit.consumerSecret,
    callbackURL: "http://127.0.0.1:3000/connect/fitbit/callback",
    passReqToCallback: true
  }, function(req, token, tokenSecret, profile, done) {
    return process.nextTick(function() {
      var id;
      id = req.params.id;
      return User.findOne({
        '_id': id,
        'email': email
      }, function(err, user) {
        if (err) {
          console.error('User.findOne error', err);
          return done(err);
        }
        if (!user) {
          return done(null);
        } else {
          console.log(profile);
          user.set("authData.fitbit.access_token", token);
          user.set("authData.fitbit.access_secret", tokenSecret);
          return done(null, user);
        }
      });
    });
  }));

}).call(this);

//# sourceMappingURL=../../target/config/passport.js.map

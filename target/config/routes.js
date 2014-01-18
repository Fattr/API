(function() {
  var helper;

  helper = require('./routeHelpers');

  module.exports = function(app, passport) {
    app.get('/', helper.index);
    app.get('/test', helper.test);
    app.get('/facebook', passport.authenticate('facebook', function(req, res) {
      console.log('auth user', req.user);
      return res.send(req.user);
    }));
    return app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: 'http://127.0.0.1:3000',
      failureRedirect: 'https://www.yahoo.com'
    }));
  };

}).call(this);

/*
//# sourceMappingURL=../../target/config/routes.js.map
*/
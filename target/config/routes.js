(function() {
  var checkAPIKey, helper, passport;

  helper = require('./routeHelpers');

  checkAPIKey = require('./apiConfig')['checkApiKey'];

  passport = require('passport');

  module.exports = function(app) {
    app.get('/', helper.index);
    app.post('/login', checkAPIKey, helper.login);
    app.post('/signup', checkAPIKey, helper.signup);
    app.get('/users', checkAPIKey, helper.getAll);
    app.post('/users', checkAPIKey, helper.signup);
    app.get('/users/:id', checkAPIKey, helper.getUser);
    app["delete"]('/users/:id', checkAPIKey, helper.deleteUser);
    app.put('/users/:id', checkAPIKey, helper.linkUserWithAuth);
    app.get('/connect/fitbit', checkAPIKey, passport.authorize('fitbit', {
      failureRedirect: '/'
    }));
    return app.get("/connect/fitbit/callback", checkAPIKey, passport.authorize("fitbit", {
      failureRedirect: "/account"
    }), function(req, res) {
      var user;
      user = req.account;
      return user.save(function(err) {
        if (err) {
          return self.error(err);
        }
        return self.redirect("/whoohoo");
      });
    });
  };

}).call(this);

//# sourceMappingURL=../../target/config/routes.js.map

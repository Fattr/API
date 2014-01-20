(function() {
  var checkAPIKey, helper;

  helper = require('./routeHelpers');

  checkAPIKey = require('./apiConfig')['checkApiKey'];

  module.exports = function(app) {
    app.get('/', helper.index);
    app.post('/login', checkAPIKey, helper.login);
    app.post('/signup', checkAPIKey, helper.signup);
    app.get('/users', checkAPIKey, helper.getAll);
    app.post('/users', checkAPIKey, helper.signup);
    app.get('/users/:id', checkAPIKey, helper.getUser);
    return app["delete"]('/users/:id', checkAPIKey, helper.deleteUser);
  };

}).call(this);

//# sourceMappingURL=../../target/config/routes.js.map

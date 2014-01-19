(function() {
  var checkAPIKey, helper;

  helper = require('./routeHelpers');

  checkAPIKey = require('./apiConfig')['checkApiKey'];

  module.exports = function(app) {
    app.get('/', helper.index);
    app.post('/login', checkAPIKey, helper.login);
    app.get('/users', checkAPIKey, helper.getAll);
    app.post('/users', checkAPIKey, helper.signup);
    return app.get('/users/:id', checkAPIKey, helper.getOne);
  };

}).call(this);

//# sourceMappingURL=../../target/config/routes.js.map

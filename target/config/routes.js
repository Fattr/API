(function() {
  var apiKey, helper;

  helper = require('./routeHelpers');

  module.exports = function(app) {
    app.get('/', helper.index);
    app.get('/test', apiKey, helper.test);
    return app.post('/signup', apiKey, helper.signup);
  };

  apiKey = function(req, res, next) {
    console.log(req.headers);
    console.log('key', req.headers.apikey);
    if (req.headers.apikey !== 'myKey') {
      console.log('wrong key');
      return res.send(500);
    } else {
      return next();
    }
  };

}).call(this);

//# sourceMappingURL=../../target/config/routes.js.map

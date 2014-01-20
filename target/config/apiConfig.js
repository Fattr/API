(function() {
  var port;

  port = process.env.PORT || 3000;

  module.exports = {
    checkApiKey: function(req, res, next) {
      if (req.headers.apikey !== 'myKey') {
        return res.send(401);
      } else {
        return next();
      }
    },
    url: 'http://localhost:' + port
  };

}).call(this);

/*
//# sourceMappingURL=../../target/config/apiConfig.js.map
*/
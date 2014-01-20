(function() {
  module.exports = function(req, res, next) {
    console.log(req.headers);
    console.log('key', req.headers.apikey);
    if (req.headers.apikey !== 'myKey') {
      console.log('wrong key');
      return res.send(401);
    } else {
      return next();
    }
  };

}).call(this);

//# sourceMappingURL=../../target/config/apiKey.js.map

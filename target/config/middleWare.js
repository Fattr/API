(function() {
  module.exports = {
    headers: function(req, res, next) {
      res.set('API-KEY', 'wassup');
      if (req.method === 'OPTIONS') {
        return res.send(200);
      } else {
        return next();
      }
    }
  };

}).call(this);

//# sourceMappingURL=../../target/config/middleWare.js.map

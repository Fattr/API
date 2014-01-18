(function() {
  var Stats, config, userUser;

  userUser = require('../models/user');

  Stats = require('../models/stat');

  config = require('./auth');

  module.exports = {
    index: function(req, res) {
      return res.json({
        'test': 'hello world'
      });
    },
    test: function(req, res) {
      console.log('test user', req.user);
      return res.json(req.user);
    }
  };

}).call(this);

/*
//# sourceMappingURL=../../target/config/routeHelpers.js.map
*/
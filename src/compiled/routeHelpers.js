(function() {
  var Stats, config, userUser;

  userUser = require('../models/user.coffee');

  Stats = require('../models/stat.coffee');

  config = require('./auth.coffee');

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
//# sourceMappingURL=../../src/compiled/routeHelpers.js.map
*/
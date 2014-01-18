(function() {
  var Session, Stats, User;

  User = require('../models/user');

  Stats = require('../models/stat');

  Session = require('../models/session');

  module.exports = {
    index: function(req, res) {
      console.log(req.headers);
      return res.json({
        'test': 'hello world'
      });
    },
    test: function(req, res) {
      console.log('test user', req.user);
      return res.json(req.user);
    },
    signup: function(req, res) {
      var credit;
      console.log('trying to signup');
      credit = req.body;
      return process.nextTick(function() {
        return User.findOne({
          'username': credit.username
        }, function(err, user) {
          var newUser;
          console.log('args', arguments);
          if (err) {
            console.log('err', err);
            res.send(400);
          }
          if (user) {
            console.log('user is alredy in there, make them redirect to sign up');
            res.send(401);
          }
          if (!user) {
            console.log('new user sign up');
            newUser = new User();
            newUser.username = credit.username;
            newUser.password = credit.password;
            return newUser.save(function(err) {
              if (err) {
                console.log('could not save user');
              }
              return res.send(201);
            });
          }
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=../../target/config/routeHelpers.js.map

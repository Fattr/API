(function() {
  var Session, Stats, User, apiUrl;

  User = require('../models/user');

  Stats = require('../models/stat');

  Session = require('../models/session');

  apiUrl = require('./apiConfig')['url'];

  module.exports = {
    index: function(req, res) {
      console.log(req.headers);
      return res.json({
        'test': 'hello world'
      });
    },
    signup: function(req, res) {
      var email, password;
      console.log('trying to signup');
      email = req.body.email;
      password = req.body.password;
      return User.findOne({
        'email': email
      }, function(err, user) {
        var newUser;
        console.log('EMAIL ===>', email);
        console.log('PASSWORD ===>', password);
        if (err) {
          console.log('err', err);
          res.send(500);
        }
        if (user) {
          console.log('user is alredy in there, make them redirect to sign up');
          res.send(204);
        }
        if (!user) {
          console.log('new user sign up');
          newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          return newUser.save(function(err) {
            if (err) {
              console.log('could not save user');
            }
            res.setHeader("location", "" + apiUrl + "/users/" + newUser._id);
            return res.send(201);
          });
        }
      });
    },
    login: function(req, res) {
      var email, password;
      console.log('trying to login');
      email = req.body.email;
      password = req.body.password;
      return User.findOne({
        'email': email
      }, function(err, user) {
        console.log('EMAIL ===>', email);
        console.log('PASSWORD ===>', password);
        if (err) {
          console.log('err', err);
          res.send(500);
        }
        if (!user || !user.validPassword(password)) {
          return res.send(401);
        }
      });
    },
    getOne: function(req, res) {
      var id;
      id = req.params.id;
      return User.findOne({
        '_id': id
      }, function(err, user) {
        if (err) {
          console.log('err', err);
          res.send(500);
        }
        if (!user) {
          console.log("user isn't in the db");
          res.send(204);
        }
        if (user) {
          return res.json(user);
        }
      });
    },
    getAll: function(req, res) {
      var id;
      id = req.params.id;
      return User.find(function(err, users) {
        if (err) {
          console.log('err', err);
          res.send(500);
        }
        return res.json(users);
      });
    }
  };

}).call(this);

//# sourceMappingURL=../../target/config/routeHelpers.js.map

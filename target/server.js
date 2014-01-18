(function() {
  var app, auth, express, mongoConfig, mongoose, passport;

  express = require('express');

  mongoose = require('mongoose');

  passport = require('passport');

  auth = require('./config/passport')(passport);

  mongoConfig = require('./config/dbconfig');

  app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(express.logger('dev'));

  app.use(express.cookieParser());

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(express.session({
    secret: 'super_fit'
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  require('./config/routes')(app, passport);

  app.listen(app.get('port'));

  console.log("I hears ya on " + (app.get('port')) + " breh!");

}).call(this);

/*
//# sourceMappingURL=../target/config/server.js.map
*/
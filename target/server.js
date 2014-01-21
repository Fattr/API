(function() {
  var app, cors, express, mongoConfig, mongoose, passport;

  express = require('express');

  mongoose = require('mongoose');

  cors = require('./config/middleWare');

  mongoConfig = require('./config/dbconfig');

  passport = require('passport');

  mongoose.connect(mongoConfig.url);

  require('./config/passport')(passport);

  app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(express.logger('dev'));

  app.use(cors.headers);

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(passport.initialize());

  require('./config/routes')(app, passport);

  app.listen(app.get('port'));

  console.log("I hears ya on " + (app.get('port')) + " breh!");

}).call(this);

//# sourceMappingURL=../target/server.js.map

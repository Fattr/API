(function() {
  var app;

  app = require('./server');

  app.listen(app.get('port'));

  console.log("I hears ya on " + (app.get('port')) + " breh!");

}).call(this);

//# sourceMappingURL=../target/app.js.map

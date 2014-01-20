(function() {
  'use strict';
  var ServiceSchema, mongoose;

  mongoose = require('mongoose');

  ServiceSchema = new mongoose.Schema({
    name: String
  });

  module.exports = mongoose.model('Service', ServiceSchema);

}).call(this);

/*
//# sourceMappingURL=../../src/compiled/service.js.map
*/
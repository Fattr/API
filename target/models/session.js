(function() {
  var SessionSchema, mongoose;

  mongoose = require('mongoose');

  SessionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      unique: true
    },
    token: String
  });

  module.exports = mongoose.model('Session', SessionSchema);

}).call(this);

//# sourceMappingURL=../../target/models/session.js.map

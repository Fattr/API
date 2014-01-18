(function() {
  'use strict';
  var UserSchema, mongoose;

  mongoose = require('mongoose');

  UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: {
      type: String,
      unique: true
    },
    facebook: {
      id: String,
      avatar: String,
      accesstoken: String,
      refreshToken: String
    },
    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Service'
      }
    ]
  });

  module.exports = mongoose.model('User', UserSchema);

}).call(this);

//# sourceMappingURL=../../target/models/user.js.map

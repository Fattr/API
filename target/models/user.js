(function() {
  'use strict';
  var UserSchema, mongoose;

  mongoose = require('mongoose');

  UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    createdAt: {
      type: Date,
      "default": Date.now
    },
    updatedAt: {
      type: Date,
      "default": Date.now
    },
    authData: {
      facebook: {
        id: String,
        access_token: String,
        expiration_date: Date
      },
      twitter: {
        id: String,
        screen_name: String,
        auth_token: String,
        auth_token_secret: String
      }
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

/*
//# sourceMappingURL=../../target/user.js.map
*/
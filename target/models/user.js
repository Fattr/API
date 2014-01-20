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
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  });

  module.exports = mongoose.model('User', UserSchema);

}).call(this);

/*
//# sourceMappingURL=../../target/user.js.map
*/
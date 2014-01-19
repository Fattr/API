(function() {
  'use strict';
  var UserSchema, bcrypt, mongoose;

  mongoose = require('mongoose');

  bcrypt = require('bcrypt-nodejs');

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

  UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  UserSchema.methods.validPassword = function(password) {
    console.log(this);
    return bcrypt.compareSync(password, this.local.password);
  };

  module.exports = mongoose.model('User', UserSchema);

}).call(this);

//# sourceMappingURL=../../target/models/user.js.map

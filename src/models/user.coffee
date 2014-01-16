mongoose = require 'mongoose'

UserSchema = new mongoose.Schema({
  name: String
  username: {
    type: String
    unique: true
  }
  email: {
    type: String
    unique: true
  }
  profile_picture: String
  })

module.exports = mongoose.model 'User', UserSchema
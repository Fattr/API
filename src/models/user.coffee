'use strict'

mongoose = require 'mongoose'
bcrypt = require 'bcrypt-nodejs'

UserSchema = new mongoose.Schema(

  name: String

  email:
    type: String
    unique: true

  password: String

  createdAt:
    type: Date
    default: Date.now

  updatedAt: 
    type: Date
    default: Date.now

  facebook:
    id: String
    avatar: String
    accesstoken: String
    refreshToken: String

  services:[{
    type: mongoose.Schema.ObjectId
    ref: 'Service'
  }]

  following:[{
    type: mongoose.Schema.ObjectId
    ref: 'User'
  }]
)

# methods ======================
# generating a hash
UserSchema.methods.generateHash = (password) ->
  bcrypt.genSalt 10, (err, salt) =>
    if err
      console.error err
      return
    bcrypt.hash password, salt, null, (err, hash) =>
      if err
        console.error err
        return
      @password = hash

# checking if password is valid
UserSchema.methods.validPassword = (password) ->
  bcrypt.compareSync password, @password

module.exports = mongoose.model 'User', UserSchema
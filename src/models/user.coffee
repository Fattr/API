'use strict'

mongoose = require 'mongoose'
bcrypt = require 'bcrypt-nodejs'

UserSchema = new mongoose.Schema(

  name: String

  username: String

  email:
    type: String
    unique: true

  facebook:
    id: String
    avatar: String
    accesstoken: String
    refreshToken: String

  services:[{
    type: mongoose.Schema.ObjectId
    ref: 'Service'
  }]
)

# methods ======================
# generating a hash
UserSchema.methods.generateHash = (password) ->
  bcrypt.hashSync password, bcrypt.genSaltSync(8), null

# checking if password is valid
UserSchema.methods.validPassword = (password) ->
  bcrypt.compareSync password, @local.password

module.exports = mongoose.model 'User', UserSchema
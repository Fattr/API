'use strict'

mongoose = require 'mongoose'

UserSchema = new mongoose.Schema(

  fullName: String

  _id: # username
    type: String
    unique: true

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

module.exports = mongoose.model 'User', UserSchema
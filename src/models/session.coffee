mongoose = require 'mongoose'

SessionSchema = new mongoose.Schema(
  _expiration:
    type: Date
    expires: '30d'
    default: Date.now()

  _userId:
    type: mongoose.Schema.ObjectId
    ref: 'User'
    unique: true # so one user cannot have more than one session
    required: true


  _access_token:
    type: String
    unique: true
    required: true
)

module.exports = mongoose.model 'Session', SessionSchema
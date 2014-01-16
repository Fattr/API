'use strict'

mongoose = require 'mongoose'

StatSchema = new mongoose.Schema(
  user:
    type: Schema.ObjectId
    ref: 'User'
  collectedFrom:
    type: Schema.ObjectId
    ref: 'Service'
  date:
    type: Date
    default: Date.now
  fairlyActiveMinutes: Number
  lightlyActiveMinutes: Number
  marginalCalories: Number
  sedentaryMinutes: Number
  steps: Number
  veryActiveMinutes: Number
)

module.exports = mongoose.model 'Stat', StatSchema
'use strict'

mongoose = require 'mongoose'

ServiceSchema = new mongoose.Schema(
  _id: # service name
    type: String
    unique: true
)

module.exports = mongoose.model 'Service', ServiceSchema
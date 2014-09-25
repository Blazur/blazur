'use strict';

var mongoose = require('mongoose');


var SettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);

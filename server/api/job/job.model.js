'use strict';

var mongoose = require('mongoose');


var JobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  code_challenge: {
    type: String
  },

  mathches: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],

  selected: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }]
});

module.exports = mongoose.model('Job', JobSchema);

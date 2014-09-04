'use strict';

var User = require('./userModel');

module.exports =  exports = {
  signin: function(req, res, next) {
    res.send(200);
  },
  done: function(req, res, next) {
    res.json(req.user);
  }
};

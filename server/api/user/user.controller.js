'use strict';

var User = require('./user.model');
var _ = require('lodash');

exports.index = function(req, res) {
  // For admin
  res.send('index');
};

exports.update = function(req, res, next) {
  if (req.body._id) { delete req.body._id }

  var updatedUser = _.merge(req.user, req.body);

  updatedUser.save(function(err, user) {
    if (err) { return next(err) }

    return res.json(user.profile);
  })
};

exports.me = function(req, res) {
  res.json(req.user.profile);
};

'use strict';

var Job = require('./job.model');
var _ = require('lodash');
var Q = require('q');

exports.create = function(req, res, next) {
  var user = req.user;

  var values = _.merge({ user: user._id }, req.params, req.body);
  console.log('values', values);

  var createJob = Q.nbind(Job.create, Job);

  createJob(values).then(function(job) {
    res.send(job);
  })
  .fail(function(err) {
    next(err);
  });
};

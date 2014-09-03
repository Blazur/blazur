'use strict';

var _ = require('lodash');

module.exports = {
  logErrors: function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
  }
};

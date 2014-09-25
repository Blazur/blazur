'use strict';

var express = require('express');
var controller = require('./settings.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;

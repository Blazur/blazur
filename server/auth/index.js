'use strict';

var express   = require('express');
    passport  = require('passport'),
    config    = require('./config/environment'),
    User      = require('../api/user/userModel');

// Passport config
require('./github/passport').setup(User, config);

var router = express.Router();

router.use('/github', require('./github'));

exports = module.exports = router;

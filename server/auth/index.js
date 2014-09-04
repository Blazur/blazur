'use strict';

var express   = require('express'),
    passport  = require('passport'),
    config    = require('../config/environment'),
    User      = require('../api/user/user.model');

// Passport config
require('./github/passport').setup(User, config);

var router = express.Router();
router.get('/closewindow', function(req, res) {
  res.render('closewindow');
});
router.use('/github', require('./github'));

exports = module.exports = router;

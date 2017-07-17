'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Users;

router.route('/users');

module.exports = router;
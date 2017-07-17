'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;

router.route('/users')
  .post(UserController.create)
;

router.route('/users/:id')
  .get(UserController.getOne)
;


module.exports = router;
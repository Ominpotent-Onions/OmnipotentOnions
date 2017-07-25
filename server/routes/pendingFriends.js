'use strict';
const express = require('express');
const router = express.Router();
const PendingFriendsController = require('../controllers').PendingFriends;

router.route('/:id')
  .get(PendingFriendsController.getAllPendingFriends)
;

module.exports = router;
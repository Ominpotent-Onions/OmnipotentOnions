'use strict';
const express = require('express');
const router = express.Router();
const PendingFriendsController = require('../controllers').PendingFriends;

router.route('/pending/:id')
  .get(PendingFriendsController.getAllPendingFriends)
;

router.route('/requests/:id')
  .get(PendingFriendsController.getAllFriendRequests)
;

module.exports = router;
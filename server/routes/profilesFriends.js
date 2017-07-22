'use strict';
const express = require('express');
const router = express.Router();
const ProfileFriendController = require('../controllers').ProfilesFriends;

router.route('/:id')
  .get(ProfileFriendController.getAllFriends)
;

module.exports = router;

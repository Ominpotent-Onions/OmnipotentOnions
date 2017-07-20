'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Groups;

// router.route('/groups')
//  .get(GroupController.getAll)
//  .post(GroupController.create)
// ;

router.route('/createInvite/:id')
  .post(GroupController.createInvite)
;

module.exports = router;
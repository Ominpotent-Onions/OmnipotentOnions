'use strict';
const express = require('express');
const router = express.Router();
const AttendeeController = require('../controllers').Attendees;

router.route('/attendance')
  .post(AttendeeController.join)
  .delete(AttendeeController.unjoin)
;

module.exports = router;
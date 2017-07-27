'use strict';
const express = require('express');
const router = express.Router();
const EventController = require('../controllers').Events;

router.route('/events/:groupId')
  .post(EventController.createEvent)
  .delete(EventController.deleteEvent)
;

module.exports = router;
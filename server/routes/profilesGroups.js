'use strict';
const express = require('express');
const router = express.Router();
const ProfileGroupController = require('../controllers').ProfilesGroups;

router.route('/:id')
  .get(ProfileGroupController.getAllGroups)
;

router.route('/fetchOneGroup/:id')
  .post(ProfileGroupController.joinGroup)
;


module.exports = router;
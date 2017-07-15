'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/')
  .get((req, res) => {
    res.end('Hello World');
  });
module.exports = router;

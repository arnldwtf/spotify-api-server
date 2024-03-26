const express = require('express');
const router = express.Router();

const {
  topartistsController,
} = require('../controllers/topartists.controller');

router.get('/', topartistsController);

module.exports = router;

const express = require('express');
const router = express.Router();

const { toptracksController } = require('../controllers/toptracks.controller');

router.get('/', toptracksController);

module.exports = router;

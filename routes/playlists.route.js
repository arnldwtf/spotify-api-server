const express = require('express');
const router = express.Router();

const { playlistsController } = require('../controllers/playlists.controller');

router.get('/', playlistsController);

module.exports = router;

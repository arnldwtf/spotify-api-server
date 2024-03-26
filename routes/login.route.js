const express = require('express');
const router = express.Router();

const {
  loginController,
  callbackController,
} = require('../controllers/login.controller');

router.get('/login', loginController);

router.get('/callback', callbackController);

// router.get('/refresh', refreshController);

// router.get('/logout', logoutController);

module.exports = router;

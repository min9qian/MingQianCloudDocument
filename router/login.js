
const express = require('express');

const router = express.Router();

const loginHandler = require('../router_handler/login_handler')

// 登录
router.post('/login', loginHandler.login)

module.exports = router;
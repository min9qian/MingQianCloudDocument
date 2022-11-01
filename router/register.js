
const express = require('express');

const router = express.Router();

const registerHandler = require('../router_handler/register_handler')

// 注册
router.post('/register', registerHandler.register)

module.exports = router;
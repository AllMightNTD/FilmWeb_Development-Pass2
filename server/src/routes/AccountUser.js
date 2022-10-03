const express = require('express');
const router = express.Router();
const handleAccount = require('../app/controllers/HandleAccountController');

router.post('/api/login', handleAccount.handleLogin);
router.post('/api/register', handleAccount.handleRegister);
router.post('/api/change-password', handleAccount.handleChangePassword);

module.exports = router;

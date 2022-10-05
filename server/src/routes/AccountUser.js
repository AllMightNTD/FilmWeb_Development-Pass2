const express = require('express');
const router = express.Router();
const handleAccount = require('../app/controllers/HandleAccountController');
const { checkCurrentUser } = require('../app/middleware/checkcurrentUser');

router.post('/api/login', handleAccount.handleLogin);
router.post('/api/register', handleAccount.handleRegister);
router.post('/api/change-password', handleAccount.handleChangePassword);
router.route('/currentUser').get(checkCurrentUser, handleAccount.getCurrentUser);

module.exports = router;

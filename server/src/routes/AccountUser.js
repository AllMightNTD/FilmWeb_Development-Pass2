const express = require('express');
const router = express.Router();
const handleAccount = require('../app/controllers/HandleAccountController');
const { checkCurrentUser } = require('../app/middleware/checkcurrentUser');

router.post('/api/login', handleAccount.handleLogin);
router.post('/api/register', handleAccount.handleRegister);
router.post('/api/googleLogin', handleAccount.googleLogin);
router.post('/api/send-email', handleAccount.sendEmail);
router.post('/api/change-password', handleAccount.changePassword);
router.post('/api/facebookLogin', handleAccount.facebookLogin);
// Check current user ( check token gửi đi xem có tồn tại hay không)
// Render lại qua getCurrentUser
router.route('/currentUser').get(checkCurrentUser, handleAccount.getCurrentUser);

module.exports = router;

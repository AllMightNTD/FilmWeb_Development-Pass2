const bcrypt = require('bcryptjs');
const AccountUser = require('../model/AccountUser');
const jwt = require('jsonwebtoken');
const { type } = require('@testing-library/user-event/dist/type');
const { error } = require('jquery');
const JWT_SECRET = 'sdasdklajlskjdlweqwoeioiu!@#%^&*())jklmsdadsdhhweqkl';

class HandleAccountController {
    async handleLogin(req, res, next) {
        const { username, password } = req.body;

        const user = await AccountUser.findOne({ username }).lean();

        if (!user) {
            return res.json({ status: 'error', error: 'Invalid username or password' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
            console.log(token);
            return res.json({ status: 'ok', tokendata: token, data: atob(token.split('.')[1]) });
        }
        res.json({ status: 'error', error: 'Invalid username or password' });
    }
    async handleRegister(req, res, next) {
        const { username, password: plainTextpassword } = req.body;
        if (!username || typeof username !== 'string') {
            return res.json({ status: 'error', error: 'Invalid username' });
        }
        if (!plainTextpassword || typeof plainTextpassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' });
        }
        // Kiểm tra độ dài password có lớn hơn hoặc bằng 5 không
        if (plainTextpassword.length < 5) {
            return res.json({ status: 'error', error: 'Password too small . Should be atleast 6 characters ' });
        }

        // Mã hóa Password
        const password = await bcrypt.hash(plainTextpassword, 10);

        try {
            const res = await AccountUser.create({
                username,
                password,
            });
            console.log('User create successfully', res);
        } catch (error) {
            console.log(error.message);
            if (error.code === 11000) {
                return res.json({ status: 'error', error: 'Username is already in use' });
            }
            throw error;
        }
        res.send({ status: 'ok' });
    }
    handleChangePassword(req, res, next) {}
}

module.exports = new HandleAccountController();

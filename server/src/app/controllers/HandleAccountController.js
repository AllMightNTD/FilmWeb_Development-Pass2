const bcrypt = require('bcryptjs');
const AccountUser = require('../model/AccountUser');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com');

class HandleAccountController {
    async handleLogin(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await AccountUser.findOne({ username }).lean();

            if (!user) {
                return res.json({ status: 'error', error: 'Invalid username or password' });
            }
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
                console.log(token);
                return res.json({
                    status: 'ok',
                    data: {
                        token,
                        userName: user.username,
                    },
                });
            }
            res.json({ status: 'error', error: 'Invalid username or password' });
        } catch (error) {
            console.log(error.message);
        }
    }
    async handleRegister(req, res, next) {
        console.log(req.body);
        const { email, username, password: plainTextpassword } = req.body;
        if (!email || typeof email !== 'string') {
            return res.json({ status: 'error', error: 'Invalid email' });
        }
        if (!username || typeof username !== 'string') {
            return res.json({ status: 'error', error: 'Invalid email' });
        }

        if (!plainTextpassword || typeof plainTextpassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' });
        }
        // Kiểm tra độ dài password có lớn hơn hoặc bằng 5 không
        if (plainTextpassword.length < 5) {
            return res.json({ status: 'error', error: 'Password too small . Should be atleast 6 characters ' });
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.json({ status: 'error', error: 'Invalid email' });
        }

        // Mã hóa Password
        const password = await bcrypt.hash(plainTextpassword, 10);

        try {
            const user = await AccountUser.create({
                email,
                username,
                password,
            });
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
            console.log('User create successfully', res);
            res.send({
                status: 'ok',
                data: {
                    token,
                    userName: user.username,
                },
            });
        } catch (error) {
            console.log(error.message);
            if (error.code === 11000) {
                return res.json({ status: 'error', error: 'Username is already in use' });
            }
            throw error;
        }
    }
    handleChangePassword(req, res, next) {}

    async googleLogin(req, res, next) {
        const { tokenId } = req.body;
        await client
            .verifyIdToken({
                idToken: tokenId,
                audience: '70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com',
            })
            .then(async (response) => {
                const { email_verified, name, email } = response.payload;

                if (email_verified) {
                    AccountUser.findOne({ email }).exec((err, user) => {
                        if (err) {
                            return res.json({ status: 'error', error: 'Something went wrong' });
                        } else {
                            if (user) {
                                const token = jwt.sign(
                                    { id: user._id, username: user.username },
                                    process.env.JWT_SECRET_KEY,
                                );
                                console.log(token);
                                return res.json({
                                    status: 'ok',
                                    data: {
                                        token,
                                        userName: user.username,
                                    },
                                });
                            } else {
                                const password = email + process.env.JWT_SECRET_KEY;
                                const user = AccountUser.create({
                                    email,
                                    username: name,
                                    password,
                                });
                                const token = jwt.sign(
                                    { id: user._id, username: user.username },
                                    process.env.JWT_SECRET_KEY,
                                );
                                console.log('User create successfully', res);
                                res.send({
                                    status: 'ok',
                                    data: {
                                        token,
                                        userName: name,
                                    },
                                });
                            }
                        }
                    });
                }
            });
    }
    // Get current user
    async getCurrentUser(req, res, next) {
        try {
            // Khởi tạo nó là 1 object
            // Chứa trong nó 1 user ( user là 1 object)
            const data = { user: null };

            // Sau quá trình checkCurrentUser rồi
            // Có user => kiểm tra theo id sau khi verify token
            if (req.user) {
                // Tìm kiếm
                const user = await AccountUser.findOne({ _id: req.user.id });

                // Set dữ liệu cho object user đấy
                data.user = { userName: user.username };
                console.log(data);
            }
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = new HandleAccountController();

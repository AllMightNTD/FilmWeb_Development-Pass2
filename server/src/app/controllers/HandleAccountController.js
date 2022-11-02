const bcrypt = require('bcryptjs');
const AccountUser = require('../model/AccountUser');
const VerifyEmail = require('../model/VeriFiEmail');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { generatorOTP } = require('../middleware/otpMail');
const { mailTransport } = require('../middleware/otpMail');
const { isValidObjectId } = require('mongoose');
const PAGE_SIZE = 6;

const client = new OAuth2Client('70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com');

class HandleAccountController {
    listUser(req, res, next) {
        var page = req.query.page;
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            AccountUser.find({})
                .skip(skipNumber)
                // Số lượng giới hạn
                .limit(PAGE_SIZE)
                .then((users) => {
                    // Lấy dữ liệu trong model user truyền vào home

                    //  Biến nó thành Object Literal từ Object Constructor

                    // Trọc sang view (render sang view ) truyền data lấy từ model sang view
                    // view đọc file , logic và render ra màn hình từ đó trọc về browser
                    res.json(users);
                })
                .catch((error) => next(error));
        } else {
            AccountUser.find({}, function (err, users) {
                if (!err) {
                    res.send(users);
                } else {
                    res.status(500).json({ error: 'message' });
                }
            });

            // res.render('home')
        }
    }

    // [POST] /api/googleLogin
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

    // [POST] /api/register'
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

            // Check mã OTP từ người dùng

            // Đăng nhập tài khoản
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

    // Login with google
    // [POST] /api/googleLogin
    async googleLogin(req, res, next) {
        const { tokenId } = req.body;
        await client
            .verifyIdToken({
                idToken: tokenId,
                audience: '70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com',
            })
            .then((response) => {
                const { email_verified, name, email } = response.payload;

                if (email_verified) {
                    AccountUser.findOne({ email }).exec(async (err, user) => {
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
                                try {
                                    const password = email + process.env.JWT_SECRET_KEY;
                                    const user = await AccountUser.create({
                                        email,
                                        username: name,
                                        password,
                                    });
                                    // const token = jwt.sign(
                                    //     { id: user._id, username: user.username },
                                    //     process.env.JWT_SECRET_KEY,
                                    // );
                                    // console.log('User create successfully', res);
                                    // res.send({
                                    //     status: 'ok',
                                    //     data: {
                                    //         token,
                                    //         userName: name,
                                    //     },
                                    // });
                                    const token = jwt.sign(
                                        { id: user._id, username: user.username },
                                        process.env.JWT_SECRET_KEY,
                                    );
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
                        }
                    });
                }
            });
    }

    // Login with facebook
    // [POST] /api/facebookLogin
    async facebookLogin(req, res, next) {
        try {
            const { email, username } = req.body;
            const user = await AccountUser.findOne({ email }).lean();
            // Nếu trùng email có sẵn thì đăng nhập luôn theo email
            if (user) {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);
                console.log(token);
                return res.json({
                    status: 'ok',
                    data: {
                        token,
                        userName: user.username,
                    },
                });
            } else {
                try {
                    // Chưa tồn tại email thì tạo tài khoản mới
                    const password = email + process.env.JWT_SECRET_KEY;
                    const user = await AccountUser.create({
                        email,
                        username,
                        password,
                    });

                    // Tạo token để mã hóa (bao gồm id , username , password)
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
                }
            }
        } catch (error) {
            console.log(error.message);
        }
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

    // [POST] /api/send-email
    async sendEmail(req, res, next) {
        try {
            const { email } = req.body;
            const data = AccountUser.findOne({ email }).lean();
            if (data) {
                // Lưu mã code và email vào CSDL
                let otpcode = generatorOTP();
                let OtpData = new VerifyEmail({
                    email,
                    code: otpcode,
                    expireIn: new Date().getTime() + 300 * 1000,
                });
                // Lưu mã OTP và email vào CSDL
                OtpData.save();

                // Gửi mã OTP cho email
                mailTransport().sendMail(
                    {
                        from: 'emailverification@gmail.com',
                        to: email,
                        subject: 'Verify your email account',
                        html: `<h1>${otpcode}</h1>`,
                    },
                    (error, info) => {
                        // Không gửi đi được email
                        if (error) {
                            return res.json({ status: 'error', error: ` Not send OTP to email ${email} ` });
                            // Gửi đi được email
                        } else {
                            console.log(info.messageId);
                        }
                    },
                );
                return res.json({
                    status: 'ok',
                });
            } else {
                return res.json({ status: 'error', error: 'email' });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // [POST] /api/change-password
    async changePassword(req, res, next) {
        try {
            const { otpCode, email, password: plainTextpassword } = req.body;
            console.log(otpCode);
            console.log(email);

            // Tìm user có email và otpCode đúng trong CSDL
            let data = await VerifyEmail.findOne({ email, code: otpCode }).lean();
            if (data) {
                // Căn chỉnh thời gian nhập
                let currentTime = new Date().getTime();
                let diff = data.expireIn - currentTime;
                if (diff < 0) {
                    return res.json({ status: 'error', error: 'Invalid OTP' });
                } else {
                    console.log(data);

                    // Tìm kiếm user theo email lấy được để cập nhật
                    let user = await AccountUser.findOne({ email: email });

                    // Kiểm tra password
                    if (!plainTextpassword || typeof plainTextpassword !== 'string') {
                        return res.json({ status: 'error', error: 'Invalid password' });
                    }
                    // Kiểm tra độ dài password có lớn hơn hoặc bằng 5 không
                    if (plainTextpassword.length < 5) {
                        return res.json({
                            status: 'error',
                            error: 'Password too small . Should be atleast 6 characters ',
                        });
                    }
                    // Mã hóa password mới
                    const passwordnew = await bcrypt.hash(plainTextpassword, 10);

                    // Cập nhật password mới trong cơ sở dữ liệu
                    user.updateOne({ password: passwordnew })
                        .then(console.log('Done'))
                        .catch((error) => console.log(error));
                    return res.json({
                        status: 'ok',
                        data: user,
                    });
                }
            } else {
                return res.json({ status: 'error', error: 'Email and OTP invalid' });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new HandleAccountController();

import { faArrowLeftLong, faArrowRightLong, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(style);
function ForgotPass() {
    const [email, setEmail] = useState('');
    const [otpCode, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [checkSuccess, setSuccess] = useState(true);
    const [watchPass, setWatchPass] = useState(false);
    const navigate = useNavigate();

    // Xử lý gửi mã OTP email
    async function handleSendEmail(event) {
        try {
            event.preventDefault();
            console.log('You clicked submit');

            const result = await fetch('http://localhost:5000/accounts/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            }).then((res) => res.json());
            if (result.status === 'ok') {
                alert('OTP code has been sent to your gmail, please do not share with anyone');
                setSuccess(!checkSuccess);
            } else if (result.status === 'error') {
                alert(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Xử lý thay đổi mật khẩu
    async function handleChangePassword(event) {
        try {
            event.preventDefault();
            console.log('You clicked submit');

            const result = await fetch('http://localhost:5000/accounts/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otpCode,
                    password,
                    confirmpassword,
                }),
            }).then((res) => res.json());
            if (result.status === 'ok') {
                alert('Change password successfully');
                const { userData } = result.data;
                console.log(userData);
                // Thực hiện chuyển trang sau khi đổi mật khẩu thành công
                navigate('/login');
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={cx('container')}>
            {checkSuccess ? (
                <form className={cx('form_sending-email')} method="POST" onSubmit={handleSendEmail}>
                    <FontAwesomeIcon className={cx('icon_mail')} icon={faEnvelope} />

                    <h2 className={cx('text_forgot')}>Forgot Password</h2>
                    <span className={cx('text_description')}>Enter your email address</span>
                    <div className={cx('info')}>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                            className={cx('input_text')}
                        ></input>
                    </div>
                    <div className={cx('option_other')}>
                        <Link className={cx('come_login')} to="/login">
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span> Login</span>
                        </Link>
                        <Link className={cx('come_register')} to="/register">
                            <span>Register</span>
                            <FontAwesomeIcon icon={faArrowRightLong} />
                        </Link>
                    </div>
                    <button type="submit" className={cx('btn_sending-email')}>
                        Send OTP
                    </button>
                </form>
            ) : (
                <form className={cx('form_change-password')} method="POST" onSubmit={handleChangePassword}>
                    <FontAwesomeIcon className={cx('icon_mail')} icon={faCodepen} />
                    <span className={cx('text_description')}>Enter the otp code you just received from the email</span>
                    <div className={cx('info')}>
                        <input
                            type="text"
                            value={otpCode}
                            name="otpCode"
                            placeholder="Enter your OTP"
                            onChange={(e) => setOTP(e.target.value)}
                            className={cx('input_text')}
                        ></input>
                    </div>
                    <div className={cx('info')}>
                        {' '}
                        <input
                            type={watchPass ? 'text' : 'password'}
                            value={password}
                            name="password"
                            placeholder="Enter your password new"
                            onChange={(e) => setPassword(e.target.value)}
                            className={cx('input_text')}
                            required
                        ></input>
                        <Tippy
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('box_tooltip')} tabIndex="-1" {...attrs}>
                                    Check password
                                </div>
                            )}
                        >
                            <FontAwesomeIcon
                                className={cx('icon_checkPass')}
                                icon={faEye}
                                onClick={() => setWatchPass(!watchPass)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Tippy>
                    </div>
                    <div className={cx('info')}>
                        {' '}
                        <input
                            type={watchPass ? 'text' : 'password'}
                            value={confirmpassword}
                            name="confirmpassword"
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            className={cx('input_text')}
                            required
                        ></input>
                        <Tippy
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('box_tooltip')} tabIndex="-1" {...attrs}>
                                    Check password
                                </div>
                            )}
                        >
                            <FontAwesomeIcon
                                className={cx('icon_checkPass')}
                                icon={faEye}
                                onClick={() => setWatchPass(!watchPass)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Tippy>
                    </div>
                    <button type="submit" className={cx('btn_sending-email')}>
                        Change
                    </button>
                </form>
            )}
        </div>
    );
}

export default ForgotPass;

import { faArrowLeftLong, faArrowRightLong, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function ForgotPass() {
    const [emailCheck, setEmailCheck] = useState('');
    async function handleSubmit(event) {
        event.preventDefault();
        console.log('You clicked submit');

        const result = await fetch('http://localhost:5000/accounts/api/verifyEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailCheck,
            }),
        }).then((res) => res.json());
        if (result.status === 'ok') {
            alert('Verification code has been sent to your email, please do not share this code with anyone');
        } else {
            alert(result.error);
        }
    }
    return (
        <form className={cx('form_sending-email')} method="POST" onSubmit={handleSubmit}>
            <FontAwesomeIcon className={cx('icon_mail')} icon={faEnvelope} />
            <h2 className={cx('text_forgot')}>Forgot Password</h2>
            <span className={cx('text_description')}>Enter your email address</span>
            <div className={cx('info')}>
                <input
                    type="text"
                    value={emailCheck}
                    name="emaillCheck"
                    placeholder="Enter your email address"
                    onChange={(e) => setEmailCheck(e.target.value)}
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
                Continue
            </button>
        </form>
    );
}

export default ForgotPass;

import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SignUp(props) {
    const cx = classNames.bind(style);
    // Chuyển form đăng nhập
    const HandleSignIn = () => {
        props.parentCallBack(true);
    };
    return (
        <form name="Sign-Up">
            <h2 className={cx('title')}>Sign Up With</h2>
            <div className={cx('info')}>
                <label>UserName</label>
                <input type="text" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <label>Password</label>
                <input type="password" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <label>Confirm Password</label>
                <input type="password" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <label>Email</label>
                <input type="email" className={cx('input_text')}></input>
            </div>
            <button type="submit" className={cx('btn_submit')}>
                Sign in
            </button>
            <div className={cx('sign_up-hear')}>
                <span>
                    Not have an account ?{' '}
                    <a href="#" onClick={HandleSignIn}>
                        Sign in here
                    </a>
                </span>
            </div>
        </form>
    );
}

export default SignUp;

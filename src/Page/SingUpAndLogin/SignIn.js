import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SignIn(props) {
    const cx = classNames.bind(style);

    // Chuyển form đăng kí
    const HandleSignUp = () => {
        props.parentCallBack(false);
    };
    return (
        <form className={cx('form_container')} name="Sign-In">
            <h2 className={cx('title')}>Sign In With</h2>
            <div className={cx('form_connect-social')}>
                <div className={cx('facebook')}>
                    <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                    <span>FaceBook</span>
                </div>
                <div className={cx('google')}>
                    <FontAwesomeIcon icon={faGoogle} className={cx('icon')} />
                    <span>Google</span>
                </div>
            </div>
            <div className={cx('info')}>
                <label>UserName</label>
                <input type="text" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <label>Password</label>
                <input type="password" className={cx('input_text')}></input>
            </div>
            <button type="submit" className={cx('btn_submit')}>
                Sign in
            </button>
            <div className={cx('sign_up-hear')}>
                <span>
                    Not have an account ?{' '}
                    <a href="#" onClick={HandleSignUp}>
                        Sign up here
                    </a>
                </span>
            </div>
        </form>
    );
}
export default SignIn;

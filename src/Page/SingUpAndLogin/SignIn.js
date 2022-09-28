import React from 'react';
import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect } from 'react';
function SignIn(props) {
    const cx = classNames.bind(style);

    // Chuyển form đăng kí
    const HandleSignUp = () => {
        props.parentCallBack(false);
    };

    const [watchPass, setWatchPass] = useState(false);

    return (
        <>
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
                <input type="text" placeholder="UseName" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <input
                    type={watchPass ? 'text' : 'password'}
                    placeholder="Password"
                    className={cx('input_text')}
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

            <button type="submit" className={cx('btn_submit')}>
                Sign in
            </button>
            <div className={cx('sign_up-hear')}>
                <span>
                    Not have an account ?{' '}
                    <span onClick={HandleSignUp} style={{ color: 'blue', cursor: 'pointer' }}>
                        Sign up here
                    </span>
                </span>
            </div>
        </>
    );
}
export default SignIn;

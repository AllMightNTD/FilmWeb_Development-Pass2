import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
function SignUp(props) {
    const cx = classNames.bind(style);
    // Chuyển form đăng nhập
    const HandleSignIn = () => {
        props.parentCallBack(true);
    };
    const [watchPass, setWatchPass] = useState(false);
    return (
        <>
            <h2 className={cx('title')}>Sign Up With</h2>
            <div className={cx('info')}>
                <input type="text" placeholder="UseName" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <input type="password" placeholder="Password" className={cx('input_text')}></input>
            </div>
            <div className={cx('info')}>
                <input
                    type={watchPass ? 'text' : 'password'}
                    placeholder="Confirm Password"
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
            <div className={cx('info')}>
                <input type="email" placeholder="Email" className={cx('input_text')}></input>
            </div>
            <button type="submit" className={cx('btn_submit')}>
                Sign in
            </button>
            <div className={cx('sign_up-hear')}>
                <span>
                    Not have an account ?{' '}
                    <span onClick={HandleSignIn} style={{ color: 'blue', cursor: 'pointer' }}>
                        Sign in here
                    </span>
                </span>
            </div>
        </>
    );
}

export default SignUp;

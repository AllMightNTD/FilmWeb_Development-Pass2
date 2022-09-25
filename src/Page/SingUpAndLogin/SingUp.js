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
        <form name="Sign-Up">
            <h2 className={cx('title')}>Sign Up With</h2>
            <div className={cx('info')}>
                <label>UserName</label>
                <div className={cx('info_text')}>
                    <input type="text" className={cx('input_text')}></input>
                </div>
            </div>
            <div className={cx('info')}>
                <label>Password</label>
                <div className={cx('info_text')}>
                    <input type="password" className={cx('input_text')}></input>
                </div>
            </div>
            <div className={cx('info')}>
                <label>Confirm Password</label>
                <div className={cx('info_text')}>
                    <input type={watchPass ? 'text' : 'password'} className={cx('input_text')}></input>
                    <Tippy
                        placement="bottom"
                        render={(attrs) => (
                            <div className={cx('box_tooltip')} tabIndex="-1" {...attrs}>
                                Check password
                            </div>
                        )}
                    >
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={() => setWatchPass(!watchPass)}
                            style={{ cursor: 'pointer' }}
                        />
                    </Tippy>
                </div>
            </div>
            <div className={cx('info')}>
                <label>Email</label>
                <div className={cx('info_text')}>
                    {' '}
                    <input type="email" className={cx('input_text')}></input>
                </div>
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
        </form>
    );
}

export default SignUp;

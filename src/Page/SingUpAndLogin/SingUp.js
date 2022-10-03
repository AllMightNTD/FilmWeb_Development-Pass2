import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect } from 'react';
function SignUp(props) {
    const cx = classNames.bind(style);

    const [signInProps, setSignInProps] = useState(false);
    // Chuyển form đăng nhập

    const HandleSignIn = (isCheck) => {
        props.parentCallBack(isCheck);
    };

    console.log(signInProps);
    const [watchPass, setWatchPass] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('You clicked submit');

        const result = await fetch('http://localhost:5000/accounts/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((res) => res.json());
        if (result.status === 'ok') {
            alert('Success fully');
            HandleSignIn(true);
        } else {
            alert(result.error);
        }
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2 className={cx('title')}>Sign Up With</h2>
            <div className={cx('info')}>
                <input
                    value={username}
                    // onChange={(e) => setUsename(e.target.value)}
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="UseName"
                    className={cx('input_text')}
                ></input>
            </div>
            <div className={cx('info')}>
                <input
                    type={watchPass ? 'text' : 'password'}
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
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
            {/* <div className={cx('info')}>
                <input
                    type={watchPass ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className={cx('input_text')}
                ></input>
            </div> */}
            {/* <div className={cx('info')}>
                <input type="email" placeholder="Email" className={cx('input_text')}></input>
            </div> */}
            <button type="submit" className={cx('btn_submit')}>
                Sign Up
            </button>
            <div className={cx('sign_up-hear')}>
                <span>
                    Not have an account ?{' '}
                    <span onClick={() => HandleSignIn(true)} style={{ color: 'blue', cursor: 'pointer' }}>
                        Sign in here
                    </span>
                </span>
            </div>
        </form>
    );
}

export default SignUp;

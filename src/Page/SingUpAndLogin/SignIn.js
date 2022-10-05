import React from 'react';
import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Components/AppConText';
import { useContext } from 'react';
function SignIn(props) {
    const cx = classNames.bind(style);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleSubmitSignIn(event) {
        event.preventDefault();
        const result = await fetch('http://localhost:5000/accounts/api/login', {
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
            alert('Sign In Successfully');
            const { token, userName } = result.data;
            console.log('Got the token', token);
            console.log('Got the data', userName);
            localStorage.setItem('token', token);
            // Ban du lieu ra cha
            dispatch({ type: 'CURRENT_USER', payload: { userName } });
            navigate('/');
        } else {
            alert(result.error);
        }
    }

    const [watchPass, setWatchPass] = useState(false);

    return (
        <form method="POST" className={cx('form_container')} onSubmit={handleSubmitSignIn}>
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
                <input
                    type="text"
                    value={username}
                    name="username"
                    placeholder="UseName"
                    onChange={(e) => setUsername(e.target.value)}
                    className={cx('input_text')}
                ></input>
            </div>
            <div className={cx('info')}>
                <input
                    type={watchPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
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
                    Not have an account ? <span style={{ color: 'blue', cursor: 'pointer' }}>Sign up here</span>
                </span>
            </div>
        </form>
    );
}
export default SignIn;

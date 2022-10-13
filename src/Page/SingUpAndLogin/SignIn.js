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
import GoogleLogin from '@leecheuk/react-google-login';
import AppContext from '../../Components/AppConText';
import { useContext } from 'react';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import axios from 'axios';
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
            // Thực hiện chuyển trang sau khi đăng nhập
            navigate('/employee');
        } else {
            alert(result.error);
        }
    }

    const [watchPass, setWatchPass] = useState(false);

    // Đăng nhập google thành công
    const responseSuccesGoogle = (response) => {
        console.log(response);
        axios({
            method: 'POST',
            url: 'http://localhost:5000/accounts/api/googleLogin',
            data: {
                tokenId: response.tokenId,
            },
        }).then((response) => {
            console.log(response.data.data);
            const token = response.data.data.token;
            const userName = response.data.data.name;
            console.log(token);
            console.log(userName);
            localStorage.setItem('token', token);
            // Ban du lieu ra cha
            dispatch({ type: 'CURRENT_USER', payload: { userName } });
            // Thực hiện chuyển trang sau khi đăng nhập
            navigate('/employee');
        });
    };
    const responseErrorGoogle = (res) => {
        console.log(res);
    };

    const clientId = '70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com';
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ clientId: clientId });
        });
    }, []);

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
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={responseSuccesGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    ,
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
                    Not have an account ?{' '}
                    <Link style={{ color: 'blue', cursor: 'pointer' }} to="/register">
                        Sign up here
                    </Link>
                </span>
            </div>
        </form>
    );
}
export default SignIn;

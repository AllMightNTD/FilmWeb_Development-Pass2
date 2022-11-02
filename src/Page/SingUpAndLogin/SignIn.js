import React from 'react';
import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '@leecheuk/react-google-login';
import AppContext from '../../Components/AppConText';
import { useContext } from 'react';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import ToastSuccess from '../../Accessibilyty';
function SignIn(props) {
    const cx = classNames.bind(style);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const [checkSuccess, setCheckSuccess] = useState(false);

    // Đăng nhập với tài khoản
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
    async function responseSuccesGoogle(response) {
        console.log(response);
        const result = await fetch('http://localhost:5000/accounts/api/googleLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenId: response.tokenId,
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

    // Trường hợp login với google bị lỗi
    const responseErrorGoogle = (res) => {
        console.log(res);
    };

    // clientID google
    const clientId = '70938607416-qpjajlmeu6i5shtmum9kfvr7ti83a6tj.apps.googleusercontent.com';
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ clientId: clientId });
        });
    }, []);

    // Login with Facebook
    async function responseFacebook(response) {
        console.log(response);
        const result = await fetch('http://localhost:5000/accounts/api/facebookLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: response.email,
                username: response.name,
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
    async function componentClicked(data) {
        console.warn(data);
    }

    const [checkForgotPass, setCheckForgotPass] = useState(false);

    const handleRenderViewForgotPass = () => {
        setCheckForgotPass(!checkForgotPass);
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCheckSuccess(false);
    //     }, 5000);
    // });

    return (
        <div className={cx('container')}>
            <form method="POST" className={cx('form_container')} onSubmit={handleSubmitSignIn}>
                <h2 className={cx('title')}>Sign In With</h2>

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
                <Link
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={handleRenderViewForgotPass}
                    to="/forgotPass"
                    className={cx('forgot_pass')}
                >
                    Forgot Password ?
                </Link>

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
                <div className={cx('form_connect-social')}>
                    <div className={cx('facebook_login')}>
                        <div className={cx('facebook_icon')}>
                            <FontAwesomeIcon className={cx('icon_facebook')} icon={faFacebook} />
                        </div>
                        <FacebookLogin
                            appId="657634382595918"
                            autoLoad={false}
                            textButton="Login with Facebook"
                            cssClass={cx('facebook_css')}
                            size="metro"
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                        />
                    </div>

                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={responseSuccesGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    >
                        <div>
                            <span>Login with Google</span>
                        </div>
                    </GoogleLogin>
                </div>
            </form>
        </div>
    );
}
export default SignIn;

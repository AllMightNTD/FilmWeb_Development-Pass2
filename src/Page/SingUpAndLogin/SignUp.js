import style from './SignUpAndLogin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import AppContext from '../../Components/AppConText';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp(props) {
    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const cx = classNames.bind(style);

    const [watchPass, setWatchPass] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    async function handleSubmit(event) {
        event.preventDefault();
        console.log('You clicked submit');

        const result = await fetch('http://localhost:2000/accounts/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
                confirmpassword,
            }),
        }).then((res) => res.json());
        if (result.status === 'ok') {
            alert('Success fully');
            const { token, userName } = result.data;
            console.log(result.data);
            localStorage.setItem('token', token);
            // Day ra cha
            dispatch({ type: 'CURRENT_USER', payload: { userName } });
            // Thực hiện chuyển trang sau khi đăng ký
            navigate('/employee');
        } else {
            alert(result.error);
        }
    }

    return (
        <div className={cx('container')}>
            <form method="POST" onSubmit={handleSubmit} className={cx('form_container')}>
                <h2 className={cx('title')}>Sign Up With</h2>
                <div className={cx('info')}>
                    <input
                        value={email}
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={cx('input_text')}
                        required
                    ></input>
                </div>
                <div className={cx('info')}>
                    <input
                        value={username}
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="UseName"
                        className={cx('input_text')}
                        required
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
                        required
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
                    <input
                        type={watchPass ? 'text' : 'password'}
                        value={confirmpassword}
                        name="confirmpassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className={cx('input_text')}
                        required
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
                    Sign Up
                </button>
                <div className={cx('sign_up-hear')}>
                    <span>
                        Not have an account ?{' '}
                        <Link to="/login" style={{ color: 'blue', cursor: 'pointer' }}>
                            Sign in here
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default SignUp;

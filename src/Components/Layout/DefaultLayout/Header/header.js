import AppContext from '../../../AppConText';
import React, { useContext, useState } from 'react';

import classnames from 'classnames/bind';
import 'tippy.js/dist/tippy.css'; // optional
import style from './header.module.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import AccountAndBar from './AccountAndBar';
const cx = classnames.bind(style);

function Header() {
    const { state, dispatch } = useContext(AppContext);
    // Lấy state ra : chính là cái user , object trong đó có username
    const { user } = state;
    const SignOut = () => {
        // Xoas token
        // Cho dispatch ve null
        localStorage.removeItem('token');
        dispatch({ type: 'CURRENT_USER', payload: null });
    };
    const [visible, setVisible] = useState(false);
    const handleHideShow = () => {
        setVisible(!visible);
    };

    return (
        <div className={cx('navbar')}>
            <div className={cx('navbar_container')}>
                <div className={cx('logo_container')}>
                    <Link to="/" className={cx('logo')}>
                        NTDFilm
                    </Link>
                </div>
                <div className={cx('menu_container')}>
                    <ul className={cx('menu-list')}>
                        <li className={cx('menu-list_item')}>Home</li>
                        <li className={cx('menu-list_item')}>Movie</li>
                        <li className={cx('menu-list_item')}>Series</li>
                        <li className={cx('menu-list_item')}>Popular</li>
                        <li className={cx('menu-list_item')}>Trend</li>
                    </ul>
                </div>
                {user ? (
                    <>
                        <Tippy
                            interactive
                            visible={visible}
                            onClickOutside={() => setVisible(false)}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('Menu_settings-box')} tabIndex="-1" {...attrs}>
                                    <Link
                                        to="/listEmployee"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Information
                                    </Link>
                                    <Link
                                        to="/create"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Create
                                    </Link>
                                    <div className={cx('menu_setting-item')} onClick={() => SignOut()}>
                                        <a style={{ textDecoration: 'none', color: 'black' }} href="#">
                                            Sign Out
                                        </a>
                                    </div>
                                    <Link
                                        to="/trash"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Trash
                                    </Link>
                                </div>
                            )}
                        >
                            <div className={cx('profile_container')}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
                                    className={cx('profile-picture')}
                                    onClick={handleHideShow}
                                ></img>
                                <div className={cx('profile_text-container')}>
                                    <span className={cx('profile_text')}>{user.userName}</span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <div className={cx('toggle')}>
                                    <FontAwesomeIcon className={cx('toogle_icon')} icon={faMoon} />
                                    <FontAwesomeIcon className={cx('toogle_icon')} icon={faSun} />
                                    <div className={cx('toggle_ball')}></div>
                                </div>
                            </div>
                        </Tippy>
                    </>
                ) : (
                    <AccountAndBar />
                )}
            </div>
        </div>
    );
}

export default Header;

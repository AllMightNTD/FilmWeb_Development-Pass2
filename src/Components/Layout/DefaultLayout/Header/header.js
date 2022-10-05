import AppContext from '../../../AppConText';
import React, { useContext, useState } from 'react';

import classnames from 'classnames/bind';
import 'tippy.js/dist/tippy.css'; // optional
import style from './header.module.scss';
import NavPC from './NavPC/NavPC';
import Logo from './Logo/logo';
import AccountAndBar from './AccountAndBar';
import NavMobile from './NavMobile/NavMobile';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
const cx = classnames.bind(style);

function Header() {
    const { state, dispatch } = useContext(AppContext);
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
        <div className={cx('Header_Sign-To')}>
            <div className={cx('header_film')}>
                <nav className={cx('navbar_film')}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <NavMobile />
                    </div>
                    <NavPC />

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
                                    </div>
                                )}
                            >
                                <div className={cx('account_login')} onClick={handleHideShow}>
                                    <p>Hello , {user.userName}</p>
                                    <img
                                        src="https://img3.thuthuatphanmem.vn/uploads/2019/10/08/anh-nen-spider-man_105523432.jpg"
                                        alt="anh-spider"
                                    ></img>
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <AccountAndBar />
                    )}
                </nav>
            </div>
        </div>
    );
}

export default Header;

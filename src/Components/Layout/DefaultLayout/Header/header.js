import AppContext from '../../../AppConText';
import React, { useContext, useState } from 'react';
import classnames from 'classnames/bind';
import style from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';
import {
    faArrowRightToBracket,
    faCaretDown,
    faList,
    faMoon,
    faPlus,
    faSun,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import AccountAndBar from './AccountAndBar';
import Image from '../../../Image';
import Search from './../../Search/index';
const cx = classnames.bind(style);

function Header() {
    const { state, dispatch } = useContext(AppContext);
    // Lấy state ra : chính là cái user , object trong đó có username
    const { user } = state;
    const navigate = useNavigate();
    // if (user) {
    //     console.log(user.userName);
    //     console.log(user.id);
    // }
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

    const listSeries = [
        {
            name: 'love',
        },
        {
            name: 'act',
        },
        {
            name: 'detective',
        },
        {
            name: 'legend',
        },
        {
            name: 'music',
        },
        {
            name: 'science',
        },
        {
            name: 'history',
        },
        {
            name: 'hero',
        },
        {
            name: 'adventure',
        },
        {
            name: 'cartoon',
        },
        {
            name: 'war',
        },
        {
            name: 'criminal',
        },
        {
            name: 'horrified',
        },
        {
            name: 'sport',
        },
        {
            name: 'school',
        },
    ];

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
                        <Link to="/" className={cx('menu-list_item')}>
                            Home
                        </Link>
                        <Link to="#" className={cx('menu-list_item')}>
                            Movie
                        </Link>

                        <li className={cx('menu-list_item')}>
                            Series
                            <div className={cx('menu_series')}>
                                <ul>
                                    {listSeries.map((item, index) => (
                                        <a href={`/the-loai/${item.name}`} className={cx('series_item')}>
                                            {item.name}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <Link to="#" className={cx('menu-list_item')}>
                            Popular
                        </Link>
                        <Link to="#" className={cx('menu-list_item')}>
                            Trend
                        </Link>
                    </ul>
                    <div className={cx('search')}>
                        <Search width="340px" />
                    </div>
                </div>
                {user ? (
                    <>
                        <Tippy
                            interactive
                            visible={visible}
                            onClickOutside={() => setVisible(false)}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('Menu_settings-box')} tabIndex="-1" {...attrs}>
                                    <Link
                                        to="/listEmployee"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <FontAwesomeIcon icon={faList} className={cx('icon')} />
                                        <span>List Film</span>
                                    </Link>
                                    <Link
                                        to="/create"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                                        <span>Create</span>
                                    </Link>
                                    <div className={cx('menu_setting-item')} onClick={() => SignOut()}>
                                        <FontAwesomeIcon icon={faArrowRightToBracket} className={cx('icon')} />
                                        <span style={{ textDecoration: 'none', color: 'black' }} href="#">
                                            Sign Out
                                        </span>
                                    </div>
                                    <Link
                                        to="/trash"
                                        className={cx('menu_setting-item')}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className={cx('icon')} />
                                        <span>Trash</span>
                                    </Link>
                                </div>
                            )}
                        >
                            <div className={cx('profile_container')}>
                                <div className={cx('profile_info')} onClick={handleHideShow}>
                                    <Image
                                        src="https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
                                        className={cx('profile-picture')}
                                    ></Image>
                                    <div className={cx('profile_text-container')}>
                                        <span className={cx('profile_text')}>{user.userName}</span>
                                        <FontAwesomeIcon icon={faCaretDown} className={cx('icon_bars')} />
                                    </div>
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

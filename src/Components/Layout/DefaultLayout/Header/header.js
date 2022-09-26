import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { useEffect, useState } from 'react';
import style from './header.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faEllipsisVertical,
    faSpinner,
    faUser,
    faVideo,
    faEye,
    faFilm,
    faFileVideo,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../Logo/Capture.PNG';
import VideoItem from '../../../SearchVideoItem';
import Search from '../../Search';
const cx = classnames.bind(style);

function Header() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const ListItem = [
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            name: 'Rap',
            category: 'rap',
        },
        {
            icon: <FontAwesomeIcon icon={faEye} />,
            name: 'Ballad',
            category: 'ballad',
        },
        {
            icon: <FontAwesomeIcon icon={faFilm} />,
            name: 'Pop',
            category: 'pop',
        },
        {
            icon: <FontAwesomeIcon icon={faFileVideo} />,
            name: 'Love',
            category: 'love',
        },
    ];

    return (
        <div className={cx('header_film')}>
            <nav className={cx('navbar_film')}>
                <Link to="/" className={cx('title_film')}>
                    MUSIC VIDEO
                </Link>
                <ul className={cx('List_item-classify')}>
                    {ListItem.map((item, index) => (
                        <li>
                            <a
                                href={`/the-loai/${item.category}`}
                                className={cx('item_link-classify')}
                                style={{ textDecoration: 'none' }}
                            >
                                {item.icon}
                                <span className={cx('name_option')}> {item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Search */}
                {<Search />}

                <div className={cx('bar_settings')}>
                    <Tippy
                        interactive
                        visible={visible}
                        onClickOutside={hide}
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
                            </div>
                        )}
                    >
                        <button onClick={visible ? hide : show} className={cx('bar_menu')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} className={cx('icon-bars')} />
                        </button>
                    </Tippy>
                </div>
                <div className={cx('account_box')}>
                    <Link to={'/signUp-Login'} className={cx('account')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon_account')} />
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faBars, faClose, faUser, faVideo, faEye, faFilm, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import style from './navMobile.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
import UseWindowDemension from '../../../../../hooks/useWindowDemension';
import Search from '../../../Search';
const cx = classnames.bind(style);
function NavMobile() {
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

    const { width, height } = UseWindowDemension();

    useEffect(() => {
        if (width > 1080) {
            setClose(false);
            setCloseShadow(false);
        }
    }, [width]);

    const [isclose, setClose] = useState(false);
    const [iscloseShadow, setCloseShadow] = useState(false);
    const handleOpenBars = () => {
        setClose(!isclose);
        setCloseShadow(!iscloseShadow);
    };

    return (
        <div>
            <FontAwesomeIcon icon={faBars} className={cx('bar_menu-icon')} onClick={handleOpenBars} />
            <nav className={cx('nav_mobile')} style={{ display: `${isclose ? 'flex' : 'none'}` }}>
                <div className={cx('info_mobile')}>
                    {/* Nút tắt modal navbar_mobile */}
                    <FontAwesomeIcon icon={faClose} className={cx('close_icon')} onClick={handleOpenBars} />
                    <Link to="/" className={cx('title_film')}>
                        FiLms NtD
                    </Link>
                </div>
                <div className={cx('search_mobile')}>
                    <Search />
                </div>
                <ul className={cx('List_item-mobile')}>
                    {ListItem.map((item, index) => (
                        <li>
                            <a
                                href={`/the-loai/${item.category}`}
                                className={cx('item_link-mobile')}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={cx('icon_option')}> {item.icon}</div>
                                <span className={cx('name_option')}> {item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div
                className={cx('modal_shadows')}
                style={{ display: `${iscloseShadow ? 'block' : 'none'}` }}
                onClick={handleOpenBars}
            ></div>
        </div>
    );
}

export default NavMobile;

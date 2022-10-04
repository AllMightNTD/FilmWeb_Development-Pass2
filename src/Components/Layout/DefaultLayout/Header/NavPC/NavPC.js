import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faVideo, faEye, faFilm, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import style from './NavPC.module.scss';
import classnames from 'classnames/bind';
import Search from '../../../Search';

const cx = classnames.bind(style);

function NavPC() {
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
        <div className={cx('nav_bar-option')}>
            <ul className={cx('List_item-classify')}>
                {ListItem.map((item, index) => (
                    <li>
                        <a
                            href={`/the-loai/${item.category}`}
                            className={cx('item_link-classify')}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            {item.icon}
                            <span className={cx('name_option')}> {item.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <Search />
        </div>
    );
}

export default NavPC;

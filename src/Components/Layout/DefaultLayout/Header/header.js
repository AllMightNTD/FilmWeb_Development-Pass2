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

    // List Thể Loại
    const ListCategory = [
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
    // List Quốc Gia
    const listNation = [
        {
            Nation: 'America',
        },
        {
            Nation: 'Korea',
        },
        {
            Nation: 'Taiwan',
        },
        {
            Nation: 'China',
        },
        {
            Nation: 'ThaiLand',
        },
        {
            Nation: 'JaPan',
        },
        {
            Nation: 'HongKong',
        },
        {
            Nation: 'India',
        },
        {
            Nation: 'Canada',
        },
        {
            Nation: 'France',
        },
        {
            Nation: 'HongKong',
        },
        {
            Nation: 'EngLand',
        },
        {
            Nation: 'Germany',
        },
        {
            Nation: 'Spain',
        },
        {
            Nation: 'Russia',
        },
        {
            nation: 'Australia',
        },
    ];
    // List Năm Phát Hành
    const ListReleaseYear = [
        {
            name: 'Năm 2021',
            year: '2021',
        },
        {
            name: 'Năm 2020',
            year: '2020',
        },
        {
            name: 'Năm 2019',
            year: '2019',
        },
        {
            name: 'Năm 2018',
            year: '2018',
        },
        {
            name: 'Năm 2017',
            year: '2017',
        },
        {
            name: 'Năm 2016',
            year: '2016',
        },
        {
            name: 'Năm 2015',
            year: '2015',
        },
        {
            name: 'Năm 2014',
            year: '2014',
        },
        {
            name: 'Năm 2013',
            year: '2013',
        },
        {
            name: 'Năm 2012',
            year: '2012',
        },
    ];
    // List phim lẻ
    const ListOddMovie = [
        {
            name: 'Phim lẻ 2021',
            statusMovie: 'Oddmovie-2021',
        },
        {
            name: 'Phim lẻ 2020',
            statusMovie: 'Oddmovie-2020',
        },
        {
            name: 'Phim lẻ 2019',
            statusMovie: 'Oddmovie-2019',
        },
        {
            name: 'Phim lẻ 2018',
            statusMovie: 'Oddmovie-2018',
        },
        {
            name: 'Phim lẻ 2017',
            statusMovie: 'Oddmovie-2017',
        },
        {
            name: 'Phim lẻ 2016',
            statusMovie: 'Oddmovie-2016',
        },
        {
            name: 'Phim lẻ 2015',
            statusMovie: 'Oddmovie-2015',
        },
        {
            name: 'Phim lẻ 2014',
            statusMovie: 'Oddmovie-2014',
        },
        {
            name: 'Phim lẻ 2013',
            statusMovie: 'Oddmovie-2013',
        },
        {
            name: 'Phim lẻ 2012',
            statusMovie: 'Oddmovie-2012',
        },
    ];
    // List phim bộ
    const ListSeriesMovie = [
        {
            name: 'Phim Bộ Trung Quốc',
            statusMovie: 'SerieMovie-ChiNa',
        },
        {
            name: 'Phim Bộ Đài Loan',
            statusMovie: 'SerieMovie-Taiwan',
        },
        {
            name: 'Phim Bộ Mỹ',
            statusMovie: 'SerieMovie-America',
        },
        {
            name: 'Phim Bộ Hàn Quốc',
            statusMovie: 'SerieMovie-Korea',
        },
        {
            name: 'Phim Bộ Nhật Bản',
            statusMovie: 'SerieMovie-Japan',
        },
        {
            name: 'Phim Bộ Thái Lan',
            statusMovie: 'SerieMovie-ThaiLand',
        },
        {
            name: 'Phim Bộ Ấn Độ',
            statusMovie: 'SerieMovie-India',
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
                        <li className={cx('menu-list_item')}>
                            Release Year
                            <div className={cx('menu_series')}>
                                <ul className={cx('list_series')}>
                                    {ListReleaseYear.map((item, index) => (
                                        <a href={`/nam-phat-hanh/${item.year}`} className={cx('series_item')}>
                                            {item.name}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className={cx('menu-list_item')}>
                            Nation
                            <div className={cx('menu_series')}>
                                <ul className={cx('list_series')}>
                                    {listNation.map((item, index) => (
                                        <a href={`/quoc-gia/${item.Nation}`} className={cx('series_item')}>
                                            {item.Nation}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li className={cx('menu-list_item')}>
                            Category
                            <div className={cx('menu_series')}>
                                <ul className={cx('list_series')}>
                                    {ListCategory.map((item, index) => (
                                        <a href={`/the-loai/${item.name}`} className={cx('series_item')}>
                                            {item.name}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li className={cx('menu-list_item')}>
                            Oddmovie
                            <div className={cx('menu_series')}>
                                <ul className={cx('list_series')}>
                                    {ListOddMovie.map((item, index) => (
                                        <a href={`/phim-le/${item.statusMovie}`} className={cx('series_item')}>
                                            {item.name}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className={cx('menu-list_item')}>
                            Series
                            <div className={cx('menu_series')}>
                                <ul className={cx('list_series')}>
                                    {ListSeriesMovie.map((item, index) => (
                                        <a href={`/phim-bo/${item.statusMovie}`} className={cx('series_item')}>
                                            {item.name}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        </li>
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

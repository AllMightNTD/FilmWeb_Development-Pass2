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
import { faMagnifyingGlass, faEllipsisVertical, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';

import VideoItem from '../../../SearchVideoItem';
import Search from '../../Search';
const cx = classnames.bind(style);

function Header() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const dataA = [
        {
            name: 'Thể Loại',
            to: '/',
            placement: 'bottom-end',
            option: {
                hello: [
                    {
                        name: 'Hành Động',
                        category: 'act',
                    },
                    {
                        name: 'Tình Cảm',
                        category: 'love',
                    },
                    {
                        name: 'Trinh Thám',
                        category: 'detective',
                    },
                    {
                        name: 'Thần Thoại',
                        category: 'love',
                    },
                    {
                        name: 'Âm Nhạc',
                        category: 'love',
                    },
                    {
                        name: 'Khoa Học',
                        category: 'love',
                    },
                    {
                        name: 'Lịch Sử',
                        category: 'love',
                    },
                    {
                        name: 'Kiếm Hiệp',
                        category: 'love',
                    },
                    {
                        name: 'Phiêu Lưu',
                        category: 'love',
                    },
                    {
                        name: 'Hoạt Hình',
                        category: 'love',
                    },
                    {
                        name: 'Tâm Lý',
                        category: 'love',
                    },
                    {
                        name: 'Chiến Tranh',
                        category: 'love',
                    },
                    {
                        name: 'Hình Sự',
                        category: 'love',
                    },
                    {
                        name: 'Tài Liệu',
                        category: 'love',
                    },
                    {
                        name: 'Gia Đình',
                        category: 'love',
                    },
                    {
                        name: 'Thanh Xuân',
                        category: 'love',
                    },
                    {
                        name: 'Kinh Dị',
                        category: 'love',
                    },
                    {
                        name: 'Võ Thuật',
                        category: 'love',
                    },
                    {
                        name: 'TV Show',
                        category: 'love',
                    },
                    {
                        name: 'Cổ Trang',
                        category: 'love',
                    },
                    {
                        name: 'Thể Thao',
                        category: 'love',
                    },
                    {
                        name: 'Bí Ân',
                        category: 'love',
                    },
                    {
                        name: 'Học Đường',
                        category: 'love',
                    },
                    {
                        name: 'Động Vật',
                        category: 'love',
                    },
                ],
            },
        },
        {
            name: 'Quốc Gia',
            to: '/',
            placement: 'bottom',
            option: {
                hello: [
                    {
                        name: 'Anh',
                        category: 'england',
                    },
                    { name: 'Mỹ', category: 'america' },
                    {
                        name: 'Canada',
                        category: 'canada',
                    },
                    {
                        name: 'China',
                        category: 'china',
                    },
                    {
                        name: 'Hồng Kông',
                        category: 'england',
                    },
                    { name: 'Ấn Độ', category: 'america' },
                    {
                        name: 'Hàn Quốc',
                        category: 'canada',
                    },
                    {
                        name: 'Nga',
                        category: 'china',
                    },
                    {
                        name: 'Pháp',
                        category: 'england',
                    },
                    { name: 'Đức', category: 'america' },
                    {
                        name: 'Thái Lan',
                        category: 'canada',
                    },
                    {
                        name: 'Tây Ban Nha',
                        category: 'china',
                    },
                ],
            },
        },
        {
            name: 'Phim Lẻ',
            to: '/',
            placement: 'bottom',
            option: {
                hello: [
                    {
                        name: 'Năm 2019',
                        category: '2019',
                    },
                    { name: 'Năm 2020', category: '2020' },
                    { name: 'Năm 2021', category: '2021' },
                    { name: 'Năm 2022', category: '2022' },
                    {
                        name: 'Năm 2018',
                        category: '2019',
                    },
                    { name: 'Năm 2017', category: '2020' },
                    { name: 'Năm 2016', category: '2021' },
                    { name: 'Năm 2015', category: '2022' },
                    {
                        name: 'Năm 2014',
                        category: '2013',
                    },
                    { name: 'Năm 2012', category: '2020' },
                    { name: 'Năm 2011', category: '2021' },
                    { name: 'Năm 2010', category: '2022' },
                ],
            },
        },
        {
            name: 'Phim Bộ',
            to: '/',
            placement: 'bottom',
            option: {
                hello: [
                    {
                        name: 'Anh',
                        category: 'england',
                    },
                    { name: 'Mỹ', category: 'america' },
                    {
                        name: 'Canada',
                        category: 'canada',
                    },
                    {
                        name: 'China',
                        category: 'china',
                    },
                ],
            },
        },
        {
            name: 'Chiếu Rạp',
            to: '/',
            visible: false,
            placement: 'bottom',
            option: {
                hello: [
                    {
                        category: 'act',
                    },
                    {
                        category: 'love',
                    },
                    {
                        category: 'detective',
                    },
                    {
                        category: 'love',
                    },
                ],
            },
        },
        {
            name: 'Sắp Chiếu',
            to: '/',
            visible: false,
            placement: 'bottom',
            option: {
                hello: [
                    {
                        category: 'Hành Động',
                    },
                    {
                        category: 'Tình Cảm',
                    },
                    {
                        category: 'Hài Hước',
                    },
                    {
                        category: 'Trinh Thám',
                    },
                ],
            },
        },
    ];

    dataA.map((data) => {
        console.log(data.name);
        data.option.hello.map((data2) => {
            console.log(data2.name);
        });
    });

    return (
        <div className={cx('header_film')}>
            <nav className={cx('navbar_film')}>
                <Link to="/Employee" className={cx('title_film')}>
                    PHIM 1406
                </Link>
                <ul className={cx('List_item-classify')}>
                    {dataA.map((dataOption, index) => (
                        <Tippy
                            visible={dataOption.visible}
                            interactive
                            placement={dataOption.placement}
                            render={(attrs) => (
                                <div className={cx('OptionMovie_box')} tabIndex="-1" {...attrs}>
                                    {dataOption.option.hello.map((data2) => {
                                        return (
                                            <a className={cx('option_link-movie')} href={`/the-loai/${data2.category}`}>
                                                {data2.name}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        >
                            <Link
                                key={index}
                                to={dataOption.to}
                                className={cx('item_classify')}
                                style={{ textDecoration: 'none' }}
                            >
                                {dataOption.name}
                            </Link>
                        </Tippy>
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
                    <button className={cx('account')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon_account')} />
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Header;

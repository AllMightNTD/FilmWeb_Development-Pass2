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
    faBars,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../Logo/Capture.PNG';
import VideoItem from '../../../SearchVideoItem';
import Search from '../../Search';
import SingUpAndLogin from '../../../../Page/SingUpAndLogin/SingUpAndLogin';
import UseWindowDemension from '../../../../hooks/useWindowDemension';
const cx = classnames.bind(style);

function Header({ dataLogin, checkLoginTo }) {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const checkLogin = checkLoginTo;
    console.log(dataLogin);
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
    const [isclose, setClose] = useState(false);
    const [iscloseShadow, setiscloseShadow] = useState(false);

    // Lấy ra độ rộng của màn hình
    const { width, height } = UseWindowDemension();
    useEffect(() => {
        if (width > 1080) {
            setClose(false);
            setiscloseShadow(false);
        }
    }, [width]);

    // Hàm xử lý khi ấn vào nút 'X' để tắt navbar_mobile
    const handleClose = () => {
        setiscloseShadow(false);
        setClose(false);
    };
    // Hàm xử lý khi ấn vào icon 'menu' để mở navbar
    const handleOpenBar = () => {
        setiscloseShadow(true);
        setClose(!isclose);
    };

    // Hàm xử lý khi ấn vào modal ẩn dưới navbar_mobile
    // => ẩn Navbar_mobile luôn

    const [isopenForm, setOpenForm] = useState(false);

    // Xử lý mở form đăng kí , đăng nhập và lớp phủ
    const handleOpenFormSignUpandSignIn = () => {
        setOpenForm(!isopenForm);
        setiscloseShadow(!iscloseShadow);
    };
    // Xử lý tắt lớp phủ
    const handleCloseShadow = () => {
        setiscloseShadow(false);
        setOpenForm(false);
        setClose(false);
    };
    console.log(isclose);

    // Xử lý bật/tắt form đăng ký đăng nhập

    return (
        <div>
            <div className={cx('header_film')}>
                <nav className={cx('navbar_film')}>
                    <div className={cx('option_left')}>
                        <Link to="/" className={cx('title_film')}>
                            NTD FILM
                        </Link>
                        <FontAwesomeIcon icon={faBars} className={cx('bar_menu-icon')} onClick={handleOpenBar} />
                    </div>
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

                        {/* Search */}
                        {<Search />}
                    </div>
                    <div className={cx('option_PC-right')}>
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
                        {checkLogin ? (
                            <div className={cx('login_to-account')}>
                                <p>{dataLogin.name}</p>
                                <div className={cx('account_box')}>
                                    <img
                                        className={cx('image_account')}
                                        src="https://img.thuthuattinhoc.vn/uploads/2019/01/08/anh-anime-boy-dep-nhat_101905549.jpg"
                                    ></img>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('account_box')} onClick={handleOpenFormSignUpandSignIn}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon_account')} />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            {/* Form Đăng kí đăng nhập  */}
            {/* Hiện thị form */}
            {isopenForm ? <SingUpAndLogin /> : <></>}
            {/* Hiển thị lớp modal */}
            {/* Hiện thị trên màn anh nhỏ */}
            <div
                className={cx('modal_shadows')}
                style={{ display: `${iscloseShadow ? 'block' : 'none'}` }}
                onClick={handleCloseShadow}
            ></div>
            {/* Bật tắt nav_mobile */}
            <nav className={cx('nav_mobile')} style={{ display: `${isclose ? 'flex' : 'none'}` }}>
                <div className={cx('info_mobile')}>
                    {/* Nút tắt modal navbar_mobile */}
                    <FontAwesomeIcon icon={faClose} className={cx('close_icon')} onClick={handleClose} />
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
        </div>
    );
}

export default Header;

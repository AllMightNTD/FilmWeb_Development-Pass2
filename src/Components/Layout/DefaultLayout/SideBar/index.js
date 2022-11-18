import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import AppContext from '../../../AppConText';
import {
    faBookBookmark,
    faCircleUser,
    faHourglassStart,
    faHouse,
    faMagnifyingGlass,
    faRightToBracket,
    faTv,
    faUsers,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../Search';
import Image from '../../../Image';
import { useEffect, useContext } from 'react';

const cx = classNames.bind(style);

function SideBar({ checkHide }) {
    const { state, dispatch } = useContext(AppContext);

    const SignOut = () => {
        // Xoas token
        // Cho dispatch ve null
        localStorage.removeItem('token');
        dispatch({ type: 'CURRENT_USER', payload: null });
    };

    const [checkview, setCheckView] = useState(false);

    // Lấy state ra : chính là cái user , object trong đó có username
    const { user } = state;
    var myStyles = {};

    console.log(checkHide);

    // ẩn hiện sideBar khi ấn ra ngoài
    useEffect(() => {
        if (checkHide === false) {
            setCheckView(false);
        } else {
            setCheckView(false);
        }
    }, [checkHide]);

    // Xử lý mở to ra để xem hết
    const handleOpenViewSearch = () => {
        setCheckView(true);
    };

    function HandleStyle(width) {
        return (myStyles = { width: width });
    }
    if (checkview == true) {
        HandleStyle('300px');
    }
    if (checkview == false) {
        HandleStyle('50px');
    }

    console.log(myStyles);

    return (
        <div className={cx('sidebar')} style={myStyles}>
            {checkview ? (
                <FontAwesomeIcon className={cx('icon_close')} icon={faXmark} onClick={() => setCheckView(false)} />
            ) : (
                <></>
            )}
            <Link to="/" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faHouse} />
                </div>
                <span>Home</span>
            </Link>
            <div to="#" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className={cx('search')}>
                    <Search width="240px" />
                </div>
            </div>
            <Link to="/checkAdmin" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faUsers} />
                </div>
                <span>Users</span>
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faBookBookmark} />
                </div>
                <span>BookMarks</span>
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faTv} />
                </div>
                <span>TV</span>
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faHourglassStart} />
                </div>
                <span>Hourglass</span>
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                    <FontAwesomeIcon icon={faGratipay} />
                </div>
                <span>Film_Love</span>
            </Link>
            {user ? (
                <div className={cx('sidebar_item')}>
                    <div className={cx('left_menu-icon')}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
                            className={cx('profile-picture')}
                            onClick={handleOpenViewSearch}
                        ></Image>
                    </div>
                    <span className={cx('user_name')}>{user.userName}</span>
                </div>
            ) : (
                <>
                    {' '}
                    <Link to="/login" className={cx('sidebar_item')} onClick={SignOut}>
                        {' '}
                        <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <span>Log_in</span>
                    </Link>
                </>
            )}
            {user ? (
                <Link to="/employee" className={cx('sidebar_item')} onClick={SignOut}>
                    {' '}
                    <div className={cx('left_menu-icon')} onClick={handleOpenViewSearch}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </div>
                    <span>Log_out</span>
                </Link>
            ) : (
                <></>
            )}
        </div>
    );
}

export default SideBar;

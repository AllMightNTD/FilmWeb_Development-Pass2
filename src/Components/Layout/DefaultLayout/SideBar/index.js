import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import AppContext from '../../../AppConText';
import {
    faBookBookmark,
    faHourglassStart,
    faHouse,
    faMagnifyingGlass,
    faTv,
    faUsers,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../Search';
import useWindowDemension from '../../../../hooks/useWindowDemension';
import { useEffect, useContext } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(style);

function SideBar({ checkHide }) {
    const [checkview, setCheckView] = useState(false);
    const { width, height } = useWindowDemension();

    const { state, dispatch } = useContext(AppContext);
    // Lấy state ra : chính là cái user , object trong đó có username
    const { user } = state;
    console.log(user);
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

    console.log(width);

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

    console.log(user);

    return (
        <div className={cx('sidebar')} style={myStyles}>
            {checkview ? (
                <FontAwesomeIcon className={cx('icon_close')} icon={faXmark} onClick={() => setCheckView(false)} />
            ) : (
                <></>
            )}
            <Link to="#" className={cx('sidebar_item')}>
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
                <Search />
            </div>
            <Link to="#" className={cx('sidebar_item')}>
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
            <div className={cx('sidebar_item')}>
                <div className={cx('left_menu-icon')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
                        className={cx('profile-picture')}
                        onClick={handleOpenViewSearch}
                    ></img>
                </div>
                <span>{user.userName}</span>
            </div>
        </div>
    );
}

export default SideBar;

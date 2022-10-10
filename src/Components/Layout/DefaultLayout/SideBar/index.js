import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import {
    faBookBookmark,
    faHourglassStart,
    faHouse,
    faMagnifyingGlass,
    faTv,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function SideBar() {
    return (
        <div className={cx('sidebar')}>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faHouse} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faMagnifyingGlass} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faUsers} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faBookBookmark} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faTv} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faHourglassStart} />
            </Link>
            <Link to="#" className={cx('sidebar_item')}>
                {' '}
                <FontAwesomeIcon className={cx('left_menu-icon')} icon={faGratipay} />
            </Link>
        </div>
    );
}

export default SideBar;

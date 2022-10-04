import { Link } from 'react-router-dom';
import style from './Logo.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(style);

function Logo() {
    return (
        <div className={cx('option_left')}>
            <Link to="/" className={cx('title_film')}>
                NTD FILM
            </Link>
        </div>
    );
}

export default Logo;

import classnames from 'classnames/bind';
import style from './footer.module.scss';
const cx = classnames.bind(style);
function Footer() {
    return (
        <div className={cx('container text-3xl font-bold underline')}>
            <h1>Footer</h1>
        </div>
    );
}

export default Footer;

import classNames from 'classnames/bind';
import style from './FirstPage.module.scss';

const cx = classNames.bind(style);
function FirstPage() {
    return (
        <div className={cx('container')}>
            <img
                src="https://wallpaperaccess.com/full/1089112.jpg"
                className={cx('image_background')}
                alt="background-music"
            ></img>
            <a className={cx('btn_next-main')} href="/employee">
                <span>GO TO MOVIE</span>
            </a>
        </div>
    );
}

export default FirstPage;

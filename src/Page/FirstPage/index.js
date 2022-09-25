import classNames from 'classnames/bind';
import style from './FirstPage.module.scss';

const cx = classNames.bind(style);
function FirstPage() {
    return (
        <div className={cx('container')}>
            <img
                src="https://img5.thuthuatphanmem.vn/uploads/2021/11/17/anh-nen-dung-cu-am-nhac_013831252.jpg"
                className={cx('image_background')}
                alt="background-music"
            ></img>
            <a className={cx('btn_next-main')} href="/employee">
                <span>GO TO MUSIC</span>
            </a>
        </div>
    );
}

export default FirstPage;

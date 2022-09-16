import Footer from './Footer/Footer';
import Header from './Header/header';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

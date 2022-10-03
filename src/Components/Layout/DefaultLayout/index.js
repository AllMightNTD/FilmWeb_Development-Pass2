import Footer from './Footer/Footer';
import Header from './Header/header';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import FirstPage from '../../../Page/FirstPage';
import { useState } from 'react';
const cx = classNames.bind(style);

function DefaultLayout({
    children,
    data = {
        name: 'Nguyễn Tiến Dũng',
    },
    checked = false,
}) {
    return (
        <div className={cx('container')}>
            <Header dataLogin={data} checkLoginTo={checked} />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

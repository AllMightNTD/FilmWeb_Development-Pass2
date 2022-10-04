import classnames from 'classnames/bind';
import 'tippy.js/dist/tippy.css'; // optional
import style from './header.module.scss';
import NavPC from './NavPC/NavPC';
import Logo from './Logo/logo';
import AccountAndBar from './AccountAndBar';
import NavMobile from './NavMobile/NavMobile';
const cx = classnames.bind(style);

function Header() {
    return (
        <div className={cx('Header_Sign-To')}>
            <div className={cx('header_film')}>
                <nav className={cx('navbar_film')}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <NavMobile />
                    </div>
                    <NavPC />
                    <AccountAndBar />
                </nav>
            </div>
        </div>
    );
}

export default Header;

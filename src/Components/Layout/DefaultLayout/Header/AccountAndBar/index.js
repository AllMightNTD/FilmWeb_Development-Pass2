import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import style from './AccountAndBar.module.scss';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classnames.bind(style);
function AccountAndBar() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const [checkLogin, setCheckLogin] = useState(false);
    return (
        <div className={cx('option_PC-right')}>
            <div className={cx('bar_settings')}>
                <Tippy
                    interactive
                    visible={visible}
                    onClickOutside={hide}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('Menu_settings-box')} tabIndex="-1" {...attrs}>
                            <Link to="/login" className={cx('menu_setting-item')} style={{ textDecoration: 'none' }}>
                                Login
                            </Link>
                            <Link to="/register" className={cx('menu_setting-item')} style={{ textDecoration: 'none' }}>
                                Register
                            </Link>
                        </div>
                    )}
                >
                    <button onClick={visible ? hide : show} className={cx('bar_menu')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={cx('icon-bars')} />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default AccountAndBar;

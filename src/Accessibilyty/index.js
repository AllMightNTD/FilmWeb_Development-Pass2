import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import classnames from 'classnames/bind';
import style from './Toast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const cx = classnames.bind(style);
function ToastSuccess() {
    const [position, setPosition] = useState('top-start');

    return (
        <div className={cx('toast align-items-center')} role="alert" aria-live="assertive" aria-atomic="true">
            <div className={cx('d-flex')}>
                <div className={cx('toast-body')}>Hello, world! This is a toast message.</div>
                <button
                    type="button"
                    className={cx('btn-close me-2 m-auto')}
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    );
}

export default ToastSuccess;

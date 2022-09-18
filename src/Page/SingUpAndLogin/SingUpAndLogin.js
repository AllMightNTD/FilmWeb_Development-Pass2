import SignIn from './SignIn';
import SignUp from './SingUp';
import classNames from 'classnames/bind';
import { useState } from 'react';
import style from './SignUpAndLogin.module.scss';
const cx = classNames.bind(style);

function SingUpAndLogin() {
    const [haveAccount, setHaveAccount] = useState(true);
    const callBackFuntion = (childData) => {
        setHaveAccount(childData);
    };
    return (
        <div className={cx('Container')}>
            <div className={cx('form')}>
                {haveAccount ? (
                    <SignIn parentCallBack={callBackFuntion} />
                ) : (
                    <SignUp parentCallBack={callBackFuntion} />
                )}
            </div>
        </div>
    );
}

export default SingUpAndLogin;

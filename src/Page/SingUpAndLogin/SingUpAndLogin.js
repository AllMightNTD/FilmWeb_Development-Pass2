import SignIn from './SignIn';
import SignUp from './SingUp';
import classNames from 'classnames/bind';
import { useState } from 'react';
import style from './SignUpAndLogin.module.scss';
import { useRef, useEffect } from 'react';
import UseWindowDemension from '../../hooks/useWindowDemension';
const cx = classNames.bind(style);

function SingUpAndLogin() {
    const [haveAccount, setHaveAccount] = useState(true);
    const callBackFuntion = (childData) => {
        setHaveAccount(childData);
    };
    const [isCenter, setCenter] = useState(true);
    const formID = useRef();
    const { width, height } = UseWindowDemension();
    useEffect(() => {
        if (width <= 485) {
            setCenter(false);
        } else {
            setCenter(true);
        }
    }, [width]);
    console.log(width);
    return (
        <div className={cx(`${isCenter ? 'form' : 'form_center'}`)} ref={formID} id="form" method="POST">
            {haveAccount ? <SignIn parentCallBack={callBackFuntion} /> : <SignUp parentCallBack={callBackFuntion} />}
        </div>
    );
}

export default SingUpAndLogin;

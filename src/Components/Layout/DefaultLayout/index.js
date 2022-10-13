import Footer from './Footer/Footer';
import Header from './Header/header';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import FirstPage from '../../../Page/FirstPage';
import { useState } from 'react';
import AppReducer from '../../../Reducer/AppReducer';
import { useReducer } from 'react';
import AppContext from '../../AppConText';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import SideBar from './SideBar';
const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const initialState = { user: null, posts: [] };
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Hàm callback (gửi request liên tục lên sever để lấy lại dữ liệu )
    const checkCurrentUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: 'http://localhost:5000/accounts/currentUser',
                headers: {
                    Authorization: `${token}`,
                },
            };
            const response = await axios(option);
            console.log(response.data.data);
            if (response.data) {
                // const { userName } = response.data;
                // Object chứa name
                const { userName } = response.data.data.user;
                // Lấy ra và lưu vào state
                dispatch({ type: 'CURRENT_USER', payload: { userName } });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    // Xử lý sau khi load trang ( gọi callback )
    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    const [hideBar, setHideBar] = useState(false);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className={cx('container')}>
                <Header />
                <SideBar checkHide={hideBar} />
                <div className={cx('content')}>
                    <div className={cx('content_main')} onClick={() => setHideBar(!hideBar)}>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </AppContext.Provider>
    );
}

export default DefaultLayout;

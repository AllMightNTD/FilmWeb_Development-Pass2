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
const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const initialState = { user: null, posts: [] };
    const [state, dispatch] = useReducer(AppReducer, initialState);

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
            console.log(response.data.data.user);
            if (response.data.data.user) {
                const { userName } = response.data.data.user;
                dispatch({ type: 'CURRENT_USER', payload: { userName } });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>{children}</div>
                <Footer />
            </div>
        </AppContext.Provider>
    );
}

export default DefaultLayout;

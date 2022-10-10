import './App.css';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './Components/Layout';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    // Phải viết hoa chữ cái đầu
                    const Page = route.component;
                    // Nếu không có layout => lấy DefaultLayout
                    // Nếu route.layout = null => không lấy layout  mặc định
                    // Lấy một thẻ trống chứa nó
                    let Layout = DefaultLayout;

                    // Nếu có layout => truyền thẳng layout vào
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    {' '}
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}
export default App;

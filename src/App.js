import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './Components/Layout';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
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

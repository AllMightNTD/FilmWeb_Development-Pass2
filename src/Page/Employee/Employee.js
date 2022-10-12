import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import style from './Employee.module.scss';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import ProductCard from './MovieCard';

function Employee() {
    const cx = classnames.bind(style);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handlePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const handlePage = (number) => {
        setActive(number);
        setPage(number);
        console.log(number);
    };
    console.log(page);
    useEffect(() => {
        axios
            // page = 2 => trang thứ 2 , chứa tối đa 2 phần tử
            .get(`http://localhost:5000?page=${page}&type=less`)
            .then((response) => {
                console.log(response.data);
                setData(response ? response.data : []);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        // Truyền page , trang thứ mấy lên
    }, [page]);

    return (
        <div className={cx('container')}>
            <div className={cx('content-container')}>
                <div className={cx('feature_content')}>
                    <h1 className={cx('feature_title')}>STAR WAR</h1>
                    <p className={cx('feature_desc')}>
                        Loremsdaskdjhaskhdaksdhaskdhaskdhaskdhsakdhaskdhkasdhaskhdkashdkahdkas
                    </p>
                    <Link to="#" className={cx('feature_btn')}>
                        WATCH
                    </Link>
                </div>

                <h1 className={cx('movie-title')}>Feature Movie</h1>
                {/* Film Nổi Bật  */}
                <div className={cx('movie_feature-container')}>
                    <div className={cx('container')}>
                        <Swiper
                            freeMode={true}
                            grapCursor={true}
                            modules={true}
                            className={cx('mySwiper')}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 15,
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {data.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard data={data} key={index} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;

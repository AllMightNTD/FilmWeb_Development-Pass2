import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import style from './Employee.module.scss';
import Pagination from 'react-bootstrap/Pagination';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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
            <div className={cx('Popular')}>
                <img
                    src="https://s3.cloud.cmctelecom.vn/tinhte1/2016/07/3795952_maxresdefault_6.jpg"
                    className={cx('image_popular')}
                ></img>
                <div className={cx('infor')}>
                    <h2 className={cx('name')}>The Legend of Tarzan</h2>
                    <p className={cx('description')}>Forum with second hard attack</p>
                    <a className={cx('btn_move')}>
                        Watch Trailer
                        <FontAwesomeIcon icon={faPlay} className={cx('icon_play')} />
                    </a>
                </div>
            </div>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    {data.map((item, index) => (
                        <div key={index} className={cx('col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4')}>
                            <Link to={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                <div className={cx('item_image')}>
                                    <img className={cx('image_movie')} src={item.image} />
                                </div>
                                <div className={cx('info')}>
                                    <h3 className={cx('title_item')}>{item.name}</h3>
                                    <span className={cx('actor')}>{item.director}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('Pagination_page')}>
                <Pagination size="sm">{items}</Pagination>
                <br />
            </div>
        </div>
    );
}

export default Employee;

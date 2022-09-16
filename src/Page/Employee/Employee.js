import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieItem from '../MovieItem/Item';
import classnames from 'classnames/bind';
import style from './Employee.module.scss';
import Pagination from 'react-bootstrap/Pagination';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
            <Container fluid="xl" className={cx('mt-2', 'container_content')}>
                <Row className={cx('Row_content')}>
                    {data.map((item, index) => (
                        <MovieItem key={index} data={item} />
                    ))}
                </Row>
            </Container>
            <div className={cx('Pagination_page')}>
                <Pagination size="sm">{items}</Pagination>
                <br />
            </div>
        </div>
    );
}

export default Employee;

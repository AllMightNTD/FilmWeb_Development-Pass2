import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './EmployeeCategory.module.scss';
import Pagination from 'react-bootstrap/Pagination';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function EmployeeCategory() {
    const cx = classnames.bind(style);
    const params = useParams();
    const { category } = params;
    console.log(category);
    const [dataFilm, setDataFilm] = useState([]);
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
            .get(`http://localhost:5000/me/${category}?page=${page}&type=less`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch((error) => console.log(error));
    }, [page]);
    console.log(dataFilm);
    return (
        <div className={cx('container')}>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    {dataFilm.map((item, index) => (
                        <div key={index} className={cx('col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3')}>
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

export default EmployeeCategory;

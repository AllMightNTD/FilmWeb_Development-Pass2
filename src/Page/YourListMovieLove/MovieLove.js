import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './MovieLove.module.scss';
import Pagination from 'react-bootstrap/Pagination';
function MovieLove() {
    const cx = classnames.bind(style);
    const params = useParams();
    const { statusMovie } = params;
    console.log(statusMovie);
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
            .get(`http://localhost:2000/accounts/listUser?page=${page}&type=less`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch((error) => console.log(error));
    }, [page]);
    console.log(dataFilm)
    return (
        <div className={cx('container_category')}>
            <h1>Hello world 5</h1>
        </div>
    );
}

export default MovieLove;

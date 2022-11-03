import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './EmployeeCategory.module.scss';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Components/Image';
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
        <div className={cx('container_category')}>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    {dataFilm.map((item, index) => (
                        <div key={index} className={cx('col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 mb-4')}>
                            <Link to={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                <div className={cx('item_image')}>
                                    <Image className={cx('image_movie')} src={item.image} />
                                </div>
                                <div className={cx('infor_item-movie')}>
                                    <h5 className={cx('title_movie-item')}>{item.name}</h5>
                                    <span className={cx('actor_movie-item')}>{item.director}</span>
                                    <div className={cx('time_zone-item')}>
                                        <div className={cx('all_block-zone')}>
                                            <div className={cx('time_item')}>
                                                <FontAwesomeIcon
                                                    icon={faClockRotateLeft}
                                                    className={cx('clock_icons')}
                                                />
                                                <span className={cx('time')}>{item.timeMovie}</span>
                                            </div>
                                            <div className={cx('stars_movie-item')}>
                                                <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('Pagination_page')}>
                <Pagination size="sm" className={cx('item_Pagi')}>
                    {items}
                </Pagination>
                <br />
            </div>
        </div>
    );
}

export default EmployeeCategory;

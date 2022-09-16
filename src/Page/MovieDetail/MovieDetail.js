import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './MovieDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function MovieDetail() {
    const params = useParams();
    const { slug } = params;

    const [dataFilm, setDataFilm] = useState([]);
    const [dataNewFilm, setDataNewFilm] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${slug}`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch((error) => console.log(error));

        axios
            .get(`http://localhost:5000`)
            .then((res) => setDataNewFilm(res ? res.data : []))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('DetailFilm')}>
            <div className={cx('content')}>
                <div className={cx('content_info')}>
                    <div className={cx('image_content')}>
                        <img src={dataFilm.image} className={cx('image')}></img>
                        <Link to={`/watch-movie/${dataFilm.slug}`} className={cx('watch_film')}>
                            Xem Phim
                        </Link>
                    </div>
                    <div className={cx('info_content')}>
                        <h1>{dataFilm.name}</h1>
                        <span className={cx('info_description')}>{dataFilm.description}</span>
                        <div className={cx('info_status')}>
                            <p className={cx('country')}>
                                Quốc gia : <span>Việt Nam</span>
                            </p>
                            <p className={cx('product_year')}>
                                Năm sản xuất : <span>2022</span>
                            </p>
                            <p className={cx('category')}>
                                Thể loại : <span>{dataFilm.category}</span>
                            </p>
                        </div>
                        <div className={cx('info_evaluate')}>
                            <h2>Đánh giá phim</h2>
                            <div className={cx('list_stars')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon_stars')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon_stars')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon_stars')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon_stars')} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('cast_film')}>
                    <h3 className={cx('title')}>Diễn Viên</h3>
                    <div className={cx('list_cast')}>
                        <div className={cx('item_cast')}>
                            <img
                                className={cx('image_cast')}
                                src="https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/01/24/a/3/d/e/1516765405718_600.jpg"
                            ></img>
                            <p className={cx('info_cast')}>{dataFilm.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('list_new-film')}>
                {dataNewFilm.map((film, index) => (
                    <a href={`/MovieDetail/${film.slug}`} className={cx('Content_newFilm')}>
                        <img src={film.image}></img>
                        <div className={cx('info_film')}>
                            <h4>{film.name}</h4>
                            <span className={cx('info_description')}>{film.description}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default MovieDetail;
// src={`https://www.youtube.com/embed/${dataFilm.videoID}`}

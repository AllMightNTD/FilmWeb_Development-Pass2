import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './MovieDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlay,
    faFilm,
    faStar,
    faCircleChevronRight,
    faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UseWindowDemension from '../../hooks/useWindowDemension';
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

    const [imageElement, setImageElement] = useState(false);

    const { width, height } = UseWindowDemension();

    useEffect(() => {
        if (width <= 818) {
            setImageElement(true);
        } else {
            setImageElement(false);
        }
    });

    return (
        <div className={cx('DetailFilm')}>
            <div className={cx('top_main-image')}>
                {/* Ảnh lớn */}
                <img
                    className={cx('image_detail')}
                    src="https://anhdephd.vn/wp-content/uploads/2022/04/hinh-nen-nguoi-nhen-spider-man-1.jpg"
                ></img>
                {imageElement ? (
                    // Hiển thị trên mobile , nằm trong ảnh lớn
                    <div className={cx('left_main-content-mobile')}>
                        <img className={cx('content-img')} src={dataFilm.image} alt={dataFilm.name}></img>
                        <div className={cx('info')}>
                            <h2 className={cx('name')}>{dataFilm.name}</h2>
                            <div className={cx('stars')}>
                                <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                <span className={cx('time_movie')}>{dataFilm.timeMovie}</span>
                            </div>
                            <a href="#" className={cx('btn_play')}>
                                <FontAwesomeIcon icon={faCirclePlay} />
                                <span> Xem Phim</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/* Info  */}
            <div className={cx('content_detail')}>
                <div className={cx('content_main')}>
                    <div className={cx('left_main-content')}>
                        {/* Ảnh film */}
                        <img className={cx('image_content-PC')} src={dataFilm.image} alt={dataFilm.name}></img>
                    </div>
                    {/* Thông tin film  */}
                    <div className={cx('right_main-content')}>
                        <div className={cx('info')}>
                            <div>
                                {/* Tên  */}
                                <h2 className={cx('name')}>{dataFilm.name}</h2>
                                {/* Số sao đánh giá */}
                                <div className={cx('stars')}>
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <span className={cx('time_movie')}>{dataFilm.timeMovie}</span>
                                </div>
                            </div>
                            {/* Nút play */}
                            <a href="#" className={cx('btn_play')}>
                                <FontAwesomeIcon icon={faFilm} style={{ marginRight: ' 10px' }} />
                                Watch Movie
                            </a>
                        </div>
                        {/* Descrip and director film  */}
                        <div className={cx('bottom_content-right')}>
                            <div className={cx('info_descrip')}>
                                <span className={cx('title')}>Content Film</span>
                                <p className={cx('description')}>{dataFilm.describe}</p>
                            </div>

                            <div className={cx('founder_movie')}>
                                <div className={cx('info_founder')}>
                                    <span className={cx('title')}>Writer</span>
                                    <div className={cx('info_content')}>
                                        <img
                                            className={cx('avatar')}
                                            src="https://i0.wp.com/maxblizz.com/wp-content/uploads/2022/01/spiderman-scaled.jpg?resize=1200%2C800&ssl=1"
                                        ></img>
                                        <span className={cx('writer')}>{dataFilm.writer}</span>
                                    </div>
                                </div>
                                <div className={cx('info_founder')}>
                                    <span className={cx('title')}>Director</span>
                                    <div className={cx('info_content')}>
                                        <img
                                            className={cx('avatar')}
                                            src="https://i0.wp.com/maxblizz.com/wp-content/uploads/2022/01/spiderman-scaled.jpg?resize=1200%2C800&ssl=1"
                                        ></img>
                                        <span className={cx('writer')}>{dataFilm.director}</span>
                                    </div>
                                </div>
                                <div className={cx('info_founder')}>
                                    <span className={cx('title')}>Main actor</span>
                                    <div className={cx('info_content')}>
                                        <img
                                            className={cx('avatar')}
                                            src="https://i0.wp.com/maxblizz.com/wp-content/uploads/2022/01/spiderman-scaled.jpg?resize=1200%2C800&ssl=1"
                                        ></img>
                                        <span className={cx('writer')}>{dataFilm.mainActor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('other_movies')}>
                    <div className={cx('container')}>
                        <h4>View Also Watched</h4>
                        <div className={cx('container_fluid')}>
                            <div className={cx('row')}>
                                {dataNewFilm.map((item, index) => (
                                    <div key={index} className={cx('col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4')}>
                                        <Link to={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                            <div className={cx('item_image')}>
                                                <img className={cx('image_movie')} src={item.image} />
                                            </div>
                                            <div className={cx('infor_item-movie')}>
                                                <h5 className={cx('title_movie-item')}>{item.name}</h5>
                                                <span className={cx('actor_movie-item')}>{item.director}</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('block_btn-load')}>
                        <button className={cx('btn_load-more')}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
// src={`https://www.youtube.com/embed/${dataFilm.videoID}`}

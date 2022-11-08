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
import Image from '../../Components/Image';
const cx = classNames.bind(style);

function MovieDetail() {
    const params = useParams();
    const { slug } = params;

    const [dataFilm, setDataFilm] = useState([]);
    const [dataNewFilm, setDataNewFilm] = useState([]);
    // Số phần tử cắt
    const [noOfElement, setNoOfElement] = useState(4);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${slug}`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch((error) => console.log(error));
    }, [slug]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000`)
            .then((res) => setDataNewFilm(res ? res.data : []))
            .catch((error) => console.log(error));
    }, []);

    // console.log(dataNewFilm);

    // Data sau khi cắt
    const splice = dataNewFilm.slice(0, noOfElement);
    // console.log(splice);

    // Add thêm phần tử để hiển thị
    const loadMore = () => {
        setNoOfElement(noOfElement + noOfElement);
    };

    const [imageElement, setImageElement] = useState(false);

    const { width, height } = UseWindowDemension();

    useEffect(() => {
        if (width <= 840) {
            setImageElement(true);
        } else {
            setImageElement(false);
        }
    });

    return (
        <div className={cx('DetailFilm')}>
            <main className={cx('main_data')}>
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
                                <div className={cx('stars-mobile')}>
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star_icon')} icon={faStar} />
                                    <span className={cx('time_movie')}>{dataFilm.timeMovie}</span>
                                </div>
                                <a href={`/watch-movie/${dataFilm.slug}`} className={cx('btn_play')}>
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
                                <a href={`/watch-movie/${dataFilm.slug}`} className={cx('btn_play')}>
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
                                            <Image className={cx('avatar')} src={dataFilm.avatarWriter}></Image>
                                            <span className={cx('writer')}>{dataFilm.writer}</span>
                                        </div>
                                    </div>
                                    <div className={cx('info_founder')}>
                                        <span className={cx('title')}>Director</span>
                                        <div className={cx('info_content')}>
                                            <Image className={cx('avatar')} src={dataFilm.avatarDirector}></Image>
                                            <span className={cx('writer')}>{dataFilm.director}</span>
                                        </div>
                                    </div>
                                    <div className={cx('info_founder')}>
                                        <span className={cx('title')}>Main actor</span>
                                        <div className={cx('info_content')}>
                                            <Image className={cx('avatar')} src={dataFilm.avatarMainActor}></Image>
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
                                    {splice.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4')}
                                        >
                                            <a href={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                                <div className={cx('item_image')}>
                                                    <img className={cx('image_movie')} src={item.image} />
                                                </div>
                                                <div className={cx('infor_item-movie')}>
                                                    <h3 className={cx('title_movie-item')}>{item.name}</h3>
                                                    <p className={cx('actor_movie-item')}>{item.director}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('block_btn-load')}>
                            <button className={cx('btn_load-more')} onClick={loadMore}>
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MovieDetail;
// src={`https://www.youtube.com/embed/${dataFilm.videoID}`}

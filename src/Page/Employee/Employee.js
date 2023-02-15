import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import style from './Employee.module.scss';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import ProductCard from './MovieCard';
import { faClockRotateLeft, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Components/Image';

function Employee() {
    const cx = classnames.bind(style);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [movieThumbnail, setMovieThumbnail] = useState([]);
    let items = [];
    // for (let number = 1; number <= 5; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active} onClick={() => handlePage(number)}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }

    // const handlePage = (number) => {
    //     setActive(number);
    //     setPage(number);
    //     console.log(number);
    // };
    console.log(page);
    useEffect(() => {
        axios
            // page = 2 => trang thứ 2 , chứa tối đa 2 phần tử
            .get(`http://localhost:2000/storedEmloyee`)
            .then((response) => {
                console.log(response.data);
                setData(response ? response.data : []);
                setMovieThumbnail(response.data[Math.floor(Math.random() * response.data.length)]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        // Truyền page , trang thứ mấy lên
    }, []);

    return (
        <div className={cx('container_main')}>
            <div className={cx('container')}>
                <div className={cx('content-container')}>
                    <div
                        className={cx('feature_content')}
                    >
                        <Image className={cx('thumb_nail')} src={movieThumbnail.thumbnailMovie ? movieThumbnail.thumbnailMovie :'https://thuthuatnhanh.com/wp-content/uploads/2022/04/Hinh-nen-nguoi-nhen.jpeg' }></Image>
                        <div className={cx('feature_info')}>
                        <h1 className={cx('feature_title')}>{movieThumbnail.name}</h1>
                        <p className={cx('feature_desc')}>{movieThumbnail.director}</p>
                        <Link to={`/MovieDetail/${movieThumbnail.slug}`} className={cx('feature_btn')}>
                            WATCH
                        </Link>
                        </div>
                    </div>

                    <div className={cx('slider_film')}>
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
            </div>
            <div className={cx('movie-popular')}>
                <h1 className={cx('movie-title-popular')}>Popular Movie</h1>
                <div className={cx('container-fluid')}>
                    <div className={cx('row')}>
                        {data.map((item, index) => (
                            <div key={index} className={cx('col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 mb-4')}>
                                <Link to={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                    <div className={cx('item_image')}>
                                        <Image className={cx('image_movie')} src={item.image} />
                                    </div>
                                    <div className={cx('infor_item-movie')}>
                                        <h5 className={cx('title_movie-item')}>{item.name}</h5>
                                        <p className={cx('actor_movie-item')}>{item.director}</p>
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
                                    <div className={cx('container_play')}>
                                        <FontAwesomeIcon className={cx('icon_play')} icon={faPlay} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className={cx('Pagination_page')}>
                    <Pagination size="sm" className={cx('item_Pagi')}>
                        {items}
                    </Pagination>
                    <br />
                </div> */}
            </div>
        </div>
    );
}

export default Employee;
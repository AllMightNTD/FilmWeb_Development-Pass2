import style from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../Components/AppConText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHeart, faShareNodes, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import ProductCard from '../Employee/MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function WatchMovie() {
    const params = useParams();
    const { slug } = params;
    const [dataWatch, setdataWatch] = useState([]);
    const [datapopular, setDatapopular] = useState([]);
    const [likeNumber, setLikeNumber] = useState([]);
    const [isContainerActive, setIsContainerActive] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    // Lấy state ra : chính là cái user , object trong đó có username
    var { user } = state;
    var idUser;
    if (user) {
        idUser = user.id;
    }
    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${slug}`)
            .then((response) => setdataWatch(response ? response.data : []))
            .catch((error) => console.log(error));
    }, [slug]);
    const [number, setNumber] = useState(5);
    const [checkSkip, setCheckSkip] = useState(false);
    const [checkSkipFilm, setCheckSkipFilm] = useState(false);

    // Check hiển thị / ẩn nút skip
    const [checkHideButtonSkip, setCheckHideButtonSkip] = useState(true);

    // Quảng cáo
    useEffect(() => {
        setTimeout(() => {
            setNumber(number - 1);
            if (number === 0) {
                setNumber(0);
                setCheckSkip(true);
            }
        }, 1000);
    }, [number]);

    // Lấy ra danh sách phim khác
    useEffect(() => {
        axios
            // page = 2 => trang thứ 2 , chứa tối đa 2 phần tử
            .get(`http://localhost:5000`)
            .then((response) => {
                setDatapopular(response ? response.data : []);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        // Truyền page , trang thứ mấy lên
    }, []);

    const filmGood =
        'https://scontent.cdninstagram.com/v/t39.25447-2/10000000_1529846804145158_7067454641157942414_n.mp4?_nc_cat=100&vs=bf14758b81a3dc4d&_nc_vs=HBksFQAYJEdJQ1dtQUFHWkZJM1kyOEZBSTZzWnhpTnBCUmlibWRqQUFBRhUAAsgBABUAGCRHSUNXbUFEemJFTkhLVDhDQUY0T1FNTWpzZXgyYnJGcUFBQUYVAgLIAQBLB4gScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AHXVzZV9sYW5jem9zX2Zvcl92cW1fdXBzY2FsaW5nABFkaXNhYmxlX3Bvc3RfcHZxcwAVACUAHAAAJuSv9rLp%2BYsCFZBOKAJDMxgLdnRzX3ByZXZpZXccF0Csm1Jul41QGClkYXNoX2k0bGl0ZWJhc2ljXzVzZWNnb3BfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsPiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV9yb2lfbm90ZQtwcm9ncmVzc2l2ZRFvZW1fcm9pX3VzZXJfdGllcgAeb2VtX3JvaV9wcmVkaWN0ZWRfd2F0Y2hfdGltZV9zATAWb2VtX3JvaV9yZWNpcGVfYmVuZWZpdAUwLjAwMCVvZW1fcm9pX3N0YXRpY19iZW5lZml0X2Nvc3RfZXZhbHVhdG9yC3Byb2dyZXNzaXZlDG9lbV92aWRlb19pZBA1MDQwMjEyOTE2MDg1MzU4Em9lbV92aWRlb19hc3NldF9pZBAxMjk4MDMwNzg0MzExODc4FW9lbV92aWRlb19yZXNvdXJjZV9pZA81ODkyMzIxMTk2NjM2MDIcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZA83ODk3NTAzMDg5Mjc2NjkOdnRzX3JlcXVlc3RfaWQPZGEzNDNkM2M2NTc3NGZiJQIcHBwV8OYXGwFVAAIbAVUAAhwVAgAAABaAurcDACXEARsHiAFzAzQ2MQJjZAoyMDIyLTEwLTEzA3JjYgEwA2FwcAVWaWRlbwJjdBlDT05UQUlORURfUE9TVF9BVFRBQ0hNRU5UE29yaWdpbmFsX2R1cmF0aW9uX3MIMzY2MS43MTgCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=41a7d5&_nc_ohc=JUFIoWaZ06cAX_jQq0t&_nc_ht=scontent-dus1-1.xx&edm=APRAPSkEAAAA&oh=00_AT_nD3vc34xEojk3LkNx-kJ5znnNqGP2T1JkcQC7w6UJcg&oe=634D9936&_nc_rid=826149214188751';
    const advertisement = 'https://sponsor.imacdn.com/ff/i999-360.mp4';

    // Xử lý bỏ qua quảng cáo
    const handleSkipAdvertisement = () => {
        setCheckSkipFilm(true);
        setCheckSkip(false);
        setCheckHideButtonSkip(false);
    };
    // Xử lý like Film
    function handleLikeFilm() {
        setIsContainerActive(true);
        fetch('http://localhost:5000/likenumber/likeFilm', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                idFilm: dataWatch._id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // Kết quả like trả về theo id
                // Kết quả like trả về theo id
                console.log(result);
                // // Set data ứng với thằng id kia dữ liệu mới => cập nhật cái likes
                setdataWatch(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Xử lý unlike Film
    function handleUnlikeFilm() {
        setIsContainerActive(false);
        fetch('http://localhost:5000/likenumber/unlikeFilm', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                idFilm: dataWatch._id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // Kết quả like trả về theo id
                console.log(result);
                // // Set data ứng với thằng id kia dữ liệu mới => cập nhật cái likes
                setdataWatch(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={cx('container')}>
            <div className={cx('main_film')}>
                <a href="https://www.i9bet333.com/signup" className={cx('link_advisement')}>
                    <img src="https://ff.imacdn.com/img/i999-header-pc.jpg"></img>
                </a>

                <div className={cx('main_content-type')}>
                    <video
                        src={checkSkipFilm ? filmGood : advertisement}
                        autoPlay
                        preload="auto"
                        playsInline
                        className={cx('player_video')}
                        controls
                    ></video>

                    {/* ẩn hiện nút skip video  */}
                    {checkHideButtonSkip ? (
                        <div className={cx('button_skip')} onClick={handleSkipAdvertisement}>
                            {checkSkip ? <button>Skip</button> : <button>{number}</button>}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {/* Quảng cáo */}
                <a href="https://www.i9bet333.com/signup" className={cx('link_advisement')}>
                    <img className={cx('advisement_F8')} src="https://phimmoichills.net/newchill/tk22_pc.gif"></img>
                </a>
                <div className={cx('group_setting')}>
                    <div className={cx('group_btn')}>
                        <button className={cx('change_server')}>Đổi Sever</button>
                        <button className={cx('PM_FAST')}>#1 PMFAST</button>
                        <button>#2 PMHLS</button>
                        <button>#3 PMBK</button>
                    </div>
                </div>
                <div className={cx('separate')}></div>
                {/* Bày tỏ ý kiến về phim */}
                <div className={cx('express_opinion-movie')}>
                    <h3>
                        Đánh giá phim <span>(50,72đ / 1000 lượt)</span>
                    </h3>
                    <div className={cx('star_group')}>
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                        <FontAwesomeIcon icon={faStar} className={cx('icon_star')} />
                    </div>
                    {user ? (
                        <div className={cx('button_feelings')}>
                            {' '}
                            <button
                                // Đổi màu khi like và không like
                                className={cx('btn_like')}
                                onClick={isContainerActive ? handleUnlikeFilm : handleLikeFilm}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={cx('icon_like')}
                                    style={{ color: `${isContainerActive ? 'red' : ''}` }}
                                />
                                Thích
                                <div className={cx('number_like')}>{dataWatch.likes.length}</div>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faShareNodes} className={cx('icon_share')} />
                                Chia sẻ
                            </button>
                        </div>
                    ) : (
                        <div className={cx('Need_to-login')}>
                            {' '}
                            <Link to="/login" className={cx('btn_noLogin')}>
                                You need to login to comment
                            </Link>
                        </div>
                    )}
                    <button className={cx('button_save')}>
                        <FontAwesomeIcon icon={faFlag} className={cx('icon_save')} />
                        Lưu vào facebook
                    </button>
                    <h1 className={cx('title_movie')}>{dataWatch.name}</h1>
                    <h4 className={cx('director')}>{dataWatch.director}</h4>
                    <div className={cx('description_movie')}>
                        <p className={cx('descibe_item')}>{dataWatch.describe}</p>[
                        <a href={`/MovieDetail/${dataWatch.slug}`}>Xem thêm</a>]
                    </div>
                    <div className={cx('container-popular')}>
                        <Swiper
                            freeMode={true}
                            grapCursor={true}
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
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
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {datapopular.map((data, index) => (
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

export default WatchMovie;
//

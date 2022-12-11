import style from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import AppContext from '../../Components/AppConText';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHeart, faShareNodes, faStar } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import ProductCard from '../Employee/MovieCard';
import Image from '../../Components/Image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function WatchMovie() {
    const params = useParams();
    const { slug } = params;

    // Dữ liệu hiển thị để xem
    const [dataWatch, setdataWatch] = useState([]);
    // Phim phổ biến khác
    const [datapopular, setDatapopular] = useState([]);
    const [isContainerActive, setIsContainerActive] = useState(false);
    // Xử lý thay đổi màu text Like
    const [isActiveLikeComment, setActiveLikeComment] = useState(false);
    const { state, dispatch } = useContext(AppContext);

    // Phân chia bình luận (comments)
    const [noOfElement, setNoOfElement] = useState(4);

    // id của cái comments
    const [idComment, setIdComments] = useState('');

    const [idFilm, setIdFilm] = useState('');

    // Lấy state ra : chính là cái user , object trong đó có username
    var { user } = state;
    var idUser;
    var nameUser;
    if (user) {
        idUser = user.id;
        nameUser = user.userName;
    }

    // Lấy dữ liệu phim
    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${slug}`)
            .then((response) => handleDataFilm(response ? response.data : []))
            .catch((error) => console.log(error));
    }, [slug]);

    function handleDataFilm(data) {
        console.log(data);
        setdataWatch(data);
        setIdFilm(data._id);
    }

    // Check thời gian tự động bỏ qua quảng cáo
    const [number, setNumber] = useState(5);
    // Show model xóa
    const [show, setShow] = useState(false);

    // Cắt data Comments
    var DataCommentsplice = [];
    if (dataWatch.comments) {
        DataCommentsplice = dataWatch.comments.slice(0, noOfElement);
    } else {
        DataCommentsplice = dataWatch.comments;
    }

    // Funtion load thêm bình luận
    const loadMore = () => {
        setNoOfElement(noOfElement + noOfElement);
    };
    // Value comments
    const [valueComment, setValueComment] = useState('');

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
                console.log('Day la result', result);
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

    // Xử lý like bình luận
    function handleLikeComment() {
        setActiveLikeComment(true);
    }
    // Xử lý bỏ like bình luận
    function handleUnLikeComment() {
        setActiveLikeComment(false);
    }

    // Xử lý đăng tải bình luận
    async function handleSubmitCommnets(text, postedBy, nameUser, idFilm) {
        console.log('You clicked submit');

        await fetch('http://localhost:5000/likenumber/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                postedBy: postedBy,
                nameUser: nameUser,
                idFilm: idFilm,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // Kết quả like trả về theo id
                setValueComment('');
                console.log(result);
                setdataWatch(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleShowDeleteComment(idComment) {
        setIdComments(idComment);
        setShow(true);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('main_film')}>
                <a href="https://www.i9bet333.com/signup" className={cx('link_advisement')}>
                    <Image src="https://ff.imacdn.com/img/i999-header-pc.jpg"></Image>
                </a>

                <div className={cx('main_content-type')}>
                    <iframe
                        type="text/html"
                        className={cx('player_video')}
                        src={`https://www.youtube.com/embed/${dataWatch.videoID}`}
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Quảng cáo */}
                <a href="https://www.i9bet333.com/signup" className={cx('link_advisement')}>
                    <Image className={cx('advisement_F8')} src="https://ff.imacdn.com/img/i999-header-pc.jpg"></Image>
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
                    {/* Số sao đánh giá */}
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
                        // Btn like and share
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
                                {dataWatch ? <div className={cx('number_like')}>{dataWatch.likes.length}</div> : <></>}
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faShareNodes} className={cx('icon_share')} />
                                Chia sẻ
                            </button>
                        </div>
                    ) : (
                        // Không có tài khoản => hiện cần login
                        <div className={cx('Need_to-login')}>
                            {' '}
                            <Link to="/login" className={cx('btn_noLogin')}>
                                You need to login to comment
                            </Link>
                        </div>
                    )}
                    {/* Btn lưu vào facebook */}
                    <button className={cx('button_save')}>
                        <FontAwesomeIcon icon={faFlag} className={cx('icon_save')} />
                        Lưu vào facebook
                    </button>
                    <h1 className={cx('title_movie')}>{dataWatch.name}</h1>
                    <h4 className={cx('director')}>{dataWatch.director}</h4>
                    {/* Mô tả phim */}
                    <div className={cx('description_movie')}>
                        <p className={cx('descibe_item')}>{dataWatch.describe}</p>
                        {/* <a href={`/MovieDetail/${dataWatch.slug}`}>Xem thêm</a>] */}
                    </div>
                    {/* Comments : bình luận về phim */}
                    <div className={cx('Container-comments')}>
                        <h4 className={cx('title')}>
                            Mong rằng bạn sẽ tiếp tục ủng hộ bằng cách truy cập NTDFilm để ủng hộ team !
                        </h4>
                        <div className={cx('comments-group')}>
                            <div className={cx('comments_about')}>
                                <span>Bình luận</span>
                                <div className={cx('comments-sort')}>
                                    <span className={cx('text-sort')}>Sắp xếp theo</span>
                                    <select required>
                                        <option value="">Mới nhất</option>
                                        <option value="love">Cũ nhất</option>
                                    </select>
                                </div>
                            </div>

                            {/* Đăng tải comments */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmitCommnets(valueComment, idUser, nameUser, dataWatch._id);
                                }}
                                className={cx('form_comments')}
                            >
                                <div className={cx('comments-main')}>
                                    {/* {user ? <h4 className={cx('comments-by')}>{user.userName}</h4> : <></>} */}
                                    <div className={cx('image_avatar-commnets')}>
                                        <Image
                                            className={cx('avatar')}
                                            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/307710303_418354093707451_3724584447684544601_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RVVIJ0sxNekAX_rgOWZ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfBbnzLWt17IIPPCx1QeiXakUT8cj7KV_BiY6iBYPcd4lQ&oe=638B8973"
                                        ></Image>
                                    </div>
                                    <div className={cx('post_comments')}>
                                        <input
                                            onChange={(e) => setValueComment(e.target.value)}
                                            type="text"
                                            name="valueComment"
                                            value={valueComment}
                                            className={cx('comment-text')}
                                            placeholder="Comments..."
                                        />
                                        <div className={cx('block-submit')}>
                                            {' '}
                                            <button type="submit" className={cx('btn_submit-comments')}>
                                                Đăng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/* Check sự tồn tại */}
                            {/* Cắt mảng bình luận thành mảng nhỏ */}
                            {DataCommentsplice ? (
                                DataCommentsplice.map((item, index) => (
                                    <div key={index} className={cx('user_comments')}>
                                        <div className={cx('image_avatar-commnets')}>
                                            <Image
                                                className={cx('avatar')}
                                                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/307710303_418354093707451_3724584447684544601_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5N_TV3FlOZsAX8N7pBN&tn=KYsvGxARGWrh8U0A&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAZ351xvMDWDTniaWraBkrP7e1YXAJSK7dt5CKolOYwmw&oe=636FD9F3"
                                            ></Image>
                                        </div>

                                        <div className={cx('info')}>
                                            <div className={cx('info_des')}>
                                                {user ? <h4>{item.nameUser}</h4> : <></>}
                                                {/* Comment của user */}
                                                <p>{item.text}</p>
                                                {/* Số like bình luận  */}
                                                {/* <div className={cx('number_like-comments')}>
                                                    <FontAwesomeIcon className={cx('icon_heart')} icon={faHeart} />
                                                    <span className={cx('like_number')}>200</span>
                                                </div> */}
                                            </div>
                                            <div className={cx('option')}>
                                                <button
                                                    onClick={
                                                        isActiveLikeComment ? handleUnLikeComment : handleLikeComment
                                                    }
                                                    className={cx('like')}
                                                    style={{ color: `${isActiveLikeComment ? 'blue' : '#65676b'}` }}
                                                >
                                                    Thích
                                                </button>
                                                <button className={cx('feedback')}>Phản hồi</button>

                                                {/* Nếu chính user là người đăng mới có thể xóa  */}
                                                {/* Không thì chỉ có thể ẩn của người khác đi  */}
                                                {idUser === item.postedBy ? (
                                                    <>
                                                        <button
                                                            className={cx('delete_comments')}
                                                            onClick={() => handleShowDeleteComment(item._id)}
                                                        >
                                                            Xóa
                                                        </button>

                                                        <button className={cx('repair_comments')}>Chỉnh sửa</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className={cx('delete_comments')}>Ẩn bình luận</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}

                            {DataCommentsplice && DataCommentsplice.length >= 4 ? (
                                <div className={cx('Load_add-comment')}>
                                    <button onClick={loadMore} className={cx('Load-more')}>
                                        Tải thêm bình luận{' '}
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    {/* Các film phổ biến khác */}
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

            {
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xóa bình luận ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Hủy
                        </Button>
                        <form
                            method="POST"
                            action={`http://localhost:5000/likenumber/${idFilm}/${idComment}/deleteComment?_method=DELETE`}
                        >
                            <Button variant="danger" type="submit">
                                Xóa
                            </Button>
                        </form>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
}

export default WatchMovie;
//

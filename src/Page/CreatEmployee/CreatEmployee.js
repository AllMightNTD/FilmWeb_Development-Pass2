import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames/bind';
import style from './CreatEmployee.module.scss';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faCircleChevronRight, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../Components/AppConText';
import Image from '../../Components/Image';

const cx = classnames.bind(style);

function CreatEmployee() {
    const [imageValue, setImage] = useState('');
    const [thumbnailMovie, setThumbnailMovie] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [directorValue, setDirectorValue] = useState('');
    const [timeMovieValue, setTimemovieValue] = useState('');
    const [avatarDirector, setAvatarDirector] = useState('');
    const [avatarWriter, setAvatarWriter] = useState('');
    const [avatarMainActor, setAvatarMainActor] = useState('');
    const [writer, setWriter] = useState('');
    const [mainActor, setMainActor] = useState('');
    const [year, setYear] = useState('');
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const { user } = state;
    console.log(user);
    var id;
    if (user) {
        id = user.id;
    }

    // Validate Form

    return (
        <div className={cx('container')}>
            <div className={cx('create_film')}>
                <Form
                    method="POST"
                    action="http://localhost:5000/employee/saveEmployee"
                    className={cx('container_form')}
                >
                    <div className={cx('form_block')}>
                        <div className={cx('form_block-1')}>
                            <Form.Group className={cx('mb-3')} controlId="formBasicEmail">
                                <Form.Label> Tên </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the name"
                                    name="name"
                                    value={nameValue}
                                    className={cx('text_input')}
                                    onChange={(e) => setNameValue(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Giám Đốc</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Director"
                                    name="director"
                                    value={directorValue}
                                    className={cx('text_input')}
                                    onChange={(e) => setDirectorValue(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Avatar Giám Đốc</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Director source..."
                                    name="avatarDirector"
                                    value={avatarDirector}
                                    className={cx('text_input')}
                                    onChange={(e) => setAvatarDirector(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Nhà Sáng Tác</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Writer"
                                    value={writer}
                                    onChange={(e) => setWriter(e.target.value)}
                                    name="writer"
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Avatar Nhà Sáng Tác</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={avatarWriter}
                                    placeholder="Writer source ...."
                                    name="avatarWriter"
                                    className={cx('text_input')}
                                    onChange={(e) => setAvatarWriter(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Thời gian chiếu</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="timeMovie"
                                    name="timeMovie"
                                    value={timeMovieValue}
                                    onChange={(e) => setTimemovieValue(e.target.value)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Năm phát hành </Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    className={cx('ml-4')}
                                    name="year"
                                    required
                                >
                                    <option value="">--Năm Phát Hành --</option>
                                    <option value="2022">Năm 2022</option>
                                    <option value="2021">Năm 2021</option>
                                    <option value="2020">Năm 2020</option>
                                    <option value="2019">Năm 2019</option>
                                    <option value="2018">Năm 2018</option>
                                    <option value="2017">Năm 2017</option>
                                    <option value="2016">Năm 2016</option>
                                    <option value="2015">Năm 2015</option>
                                    <option value="2014">Năm 2014</option>
                                    <option value="2013">Năm 2013</option>
                                    <option value="2012">Năm 2012</option>
                                    <option value="2011">Năm 2011</option>
                                    <option value="2010">Năm 2010</option>
                                    <option value="2009">Năm 2009</option>
                                    <option value="2008">Năm 2008</option>
                                    <option value="2007">Năm 2007</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className={cx('form_block-2')}>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Nhân vật chính</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="mainActor"
                                    name="mainActor"
                                    value={mainActor}
                                    onChange={(e) => setMainActor(e.target.value)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>

                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Avatar Nhân vật chính</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=" MainActor source..."
                                    name="avatarMainActor"
                                    value={avatarMainActor}
                                    className={cx('text_input')}
                                    onChange={(e) => setAvatarMainActor(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                                <Form.Label>Thể loại</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    className={cx('ml-4')}
                                    name="category"
                                    required
                                >
                                    <option value="">--Thể Loại --</option>
                                    <option value="love">Tình Cảm</option>
                                    <option value="act">Hành Động</option>
                                    <option value="detective">Trinh Thám</option>
                                    <option value="legend">Thần Thoại</option>
                                    <option value="music">Âm Nhạc</option>
                                    <option value="science">Khoa Học</option>
                                    <option value="history">Lịch Sử</option>
                                    <option value="hero">Kiếm Hiệp</option>
                                    <option value="adventure">Phiêu Lưu</option>
                                    <option value="cartoon">Hoạt Hình</option>
                                    <option value="war">Chiến Tranh</option>
                                    <option value="criminal">Hình Sự</option>
                                    <option value="horrified">Kinh Dị</option>
                                    <option value="sport">Thể Thao</option>
                                    <option value="school">Học Đường</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                                <Form.Label>Quốc gia</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    className={cx('ml-4')}
                                    name="Nation"
                                    required
                                >
                                    <option value="">--Quốc gia --</option>
                                    <option value="America">Mỹ</option>
                                    <option value="Korea">Hàn Quốc</option>
                                    <option value="Taiwan">Đài Loan</option>
                                    <option value="China">Trung Quốc</option>
                                    <option value="ThaiLand">Thái Lan</option>
                                    <option value="JaPan">Nhật Bản</option>
                                    <option value="HongKong">Hồng Kông</option>
                                    <option value="India">Ấn Độ</option>
                                    <option value="France">Pháp</option>
                                    <option value="EngLand">Anh</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Germany">Đức</option>
                                    <option value="Spain">Tây Ban Nha</option>
                                    <option value="Russia">Nga</option>
                                    <option value="Australia">Úc</option>
                                </Form.Select>
                            </Form.Group>
                            {/* Tình trạng phim  */}
                            <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                                <Form.Label>Tình Trạng Phim</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    className={cx('ml-4')}
                                    name="statusMovie"
                                    required
                                >
                                    <option value="">--Tình Trạng --</option>
                                    <option value="Oddmovie-2021">Phim lẻ Năm 2021</option>
                                    <option value="Oddmovie-2020">Phim lẻ Năm 2020</option>
                                    <option value="Oddmovie-2019">Phim lẻ Năm 2019</option>
                                    <option value="Oddmovie-2018">Phim lẻ Năm 2018</option>
                                    <option value="Oddmovie-2017">Phim lẻ Năm 2017</option>
                                    <option value="Oddmovie-2016">Phim lẻ Năm 2016</option>
                                    <option value="Oddmovie-2015">Phim lẻ Năm 2015</option>
                                    <option value="Oddmovie-2014">Phim lẻ Năm 2014</option>
                                    <option value="Oddmovie-2013">Phim lẻ Năm 2013</option>
                                    <option value="Oddmovie-2012">Phim lẻ Năm 2012</option>
                                    <option value="SerieMovie-ChiNa">Phim Bộ Trung Quốc</option>
                                    <option value="SerieMovie-Taiwan">Phim Bộ Đài Loan</option>
                                    <option value="SerieMovie-America">Phim Bộ Mỹ</option>
                                    <option value="SerieMovie-Korea">Phim Bộ Hàn Quốc</option>
                                    <option value="SerieMovie-Japan">Phim Bộ Nhật Bản</option>
                                    <option value="SerieMovie-ThaiLand">Phim Bộ Thái Lan</option>
                                    <option value="SerieMovie-India">Phim Bộ Ấn Độ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Trang bìa</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Image"
                                    name="image"
                                    value={imageValue}
                                    onChange={(e) => setImage(e.target.value)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>

                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Ảnh nổi</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ThumbnailMovie"
                                    name="thumbnailMovie"
                                    value={thumbnailMovie}
                                    onChange={(e) => setThumbnailMovie(e.target.value)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>VideoID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="VideoID"
                                    name="videoID"
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Người Đăng</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="postedBy"
                                    value={id}
                                    name="postedBy"
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                        </div>
                        <div className={cx('form_block-3')}>
                            <Form.Group className={cx('mb-4')} controlId="formBasicPassword">
                                <Form.Label>Mô tả phim</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="describe" name="describe" />
                            </Form.Group>
                        </div>
                        <div className={cx('image_preview')}>
                            {imageValue ? (
                                <div className={cx('info_create')}>
                                    <div className={cx('item_movie')}>
                                        <div className={cx('item_image')}>
                                            <Image className={cx('image_movie')} src={imageValue} />
                                        </div>
                                        <div className={cx('infor_item-movie')}>
                                            <h5 className={cx('title_movie-item')}>{nameValue}</h5>
                                            <span className={cx('actor_movie-item')}>{directorValue}</span>
                                            <div className={cx('time_zone-item')}>
                                                <div className={cx('all_block-zone')}>
                                                    <div className={cx('time_item')}>
                                                        {imageValue ? (
                                                            <FontAwesomeIcon
                                                                icon={faClockRotateLeft}
                                                                className={cx('clock_icons')}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <span className={cx('time')}>{timeMovieValue}</span>
                                                    </div>
                                                    {imageValue ? (
                                                        <div className={cx('stars_movie-item')}>
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('star_icon')}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('star_icon')}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('star_icon')}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('star_icon')}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('Avartar')}>
                                        <div className={cx('avartar_Director')}>
                                            <div className={cx('image_avatar')}>
                                                <Image
                                                    className={cx('image_avatar')}
                                                    src={avatarDirector}
                                                    alt={directorValue}
                                                />
                                            </div>
                                            <span>{directorValue}</span>
                                        </div>
                                        <div className={cx('avartar_Writer')}>
                                            <div className={cx('image_avatar')}>
                                                {' '}
                                                <Image className={cx('image_avatar')} src={avatarWriter} alt={writer} />
                                            </div>
                                            <span>{writer}</span>
                                        </div>
                                        <div className={cx('avartar_MainActor')}>
                                            <div className={cx('image_avatar')}>
                                                <Image
                                                    className={cx('image_avatar')}
                                                    src={avatarMainActor}
                                                    alt={mainActor}
                                                ></Image>
                                            </div>
                                            <span>{mainActor}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className={cx('block_submit')}>
                        {' '}
                        <Button variant="primary" type="submit" className={cx('btn_submit')}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreatEmployee;

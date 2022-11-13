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
    const handleSubmitForm = (e) => {
        e.prenventDefault();
        if (
            nameValue === '' ||
            directorValue === '' ||
            timeMovieValue === '' ||
            avatarDirector === '' ||
            avatarWriter === '' ||
            avatarMainActor === ''
        ) {
            alert('K được để trống');
            return false;
        }
    };
    const onChangeName = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Tên phim không được để trống');
        } else {
            setNameValue(value);
        }
    };
    const onChangeDirector = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Giám đốc không được để trống');
        } else {
            setDirectorValue(value);
        }
    };
    const onChangeAvatarDirector = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Avatar giám đốc không được để trống');
        } else if (value.slice(-3) != 'jpg' || 'png') {
            alert('Sai định dạng ảnh');
        } else {
            setAvatarDirector(value);
        }
    };
    const onChangeWriter = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Biên kịch không được để trống');
        } else {
            setWriter(value);
        }
    };
    const onChangeAvatarWriter = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Avatar biên kịch không được để trống');
        } else if (value.slice(-3) != 'jpg' || 'png') {
            alert('Sai định dạng ảnh');
        } else {
            setAvatarWriter(value);
        }
    };
    const onChangeMainActor = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Diễn viên chính không được để trống');
        } else {
            setMainActor(value);
        }
    };
    const onChangeAvatarMainActor = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Avatar diễn viên chính  không được để trống');
        } else if (value.slice(-3) != 'jpg' || 'png') {
            alert('Sai định dạng ảnh');
        } else {
            setAvatarMainActor(value);
        }
    };
    const onChangeImage = (e) => {
        const value = e.target.value;
        if (value.slice(-3) != 'jpg' || 'png') {
            alert('Sai định dạng ảnh');
        } else {
            setImage(value);
        }
    };
    const onChangeTimeMovie = (e) => {
        const value = e.target.value;
        if (value === '') {
            alert('Time movie k được để trông');
        } else {
            setTimemovieValue(value);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('create_film')}>
                <Form
                    method="POST"
                    action="http://localhost:5000/employee/saveEmployee"
                    onSubmit={(e) => handleSubmitForm(e)}
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
                                    onChange={(e) => onChangeName(e)}
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
                                    onChange={(e) => onChangeDirector(e)}
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
                                    onChange={(e) => onChangeAvatarDirector(e)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Nhà Sáng Tác</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Writer"
                                    value={writer}
                                    onChange={(e) => onChangeWriter(e)}
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
                                    onChange={(e) => onChangeAvatarWriter(e)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Thời gian chiếu</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="timeMovie"
                                    name="timeMovie"
                                    value={timeMovieValue}
                                    onChange={(e) => onChangeTimeMovie(e)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Năm phát hành </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="timeMovie"
                                    name="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className={cx('text_input')}
                                />
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
                                    onChange={(e) => onChangeMainActor(e)}
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
                                    onChange={(e) => onChangeAvatarMainActor(e)}
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
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Trang bìa</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Image"
                                    name="image"
                                    value={imageValue}
                                    onChange={(e) => onChangeImage(e)}
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

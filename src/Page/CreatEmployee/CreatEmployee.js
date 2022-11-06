import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames/bind';
import style from './CreatEmployee.module.scss';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../Components/AppConText';

const cx = classnames.bind(style);

function CreatEmployee() {
    const [imageValue, setImage] = useState();
    const [nameValue, setNameValue] = useState();
    const [directorValue, setDirectorValue] = useState();
    const [timeMovieValue, setTimemovieValue] = useState();
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    console.log(user);
    var id;
    if (user) {
        id = user.id;
    }

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
                                <Form.Label> Name</Form.Label>
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
                                <Form.Label>Director</Form.Label>
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
                                <Form.Label>Writer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Writer"
                                    name="writer"
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>TimeMovie</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="timeMovie"
                                    name="timeMovie"
                                    value={timeMovieValue}
                                    onChange={(e) => setTimemovieValue(e.target.value)}
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                        </div>
                        <div className={cx('form_block-2')}>
                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Main Actor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="mainActor"
                                    name="mainActor"
                                    className={cx('text_input')}
                                />
                            </Form.Group>
                            <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    className={cx('ml-4')}
                                    name="category"
                                    required
                                >
                                    <option value="">--Thể Loại --</option>
                                    <option value="love">Love</option>
                                    <option value="rap">Rap</option>
                                    <option value="pop">Pop</option>
                                    <option value="ballad">Ballad</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>Image</Form.Label>
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
                                <Form.Label>VideoID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="VideoID"
                                    name="videoID"
                                    className={cx('text_input')}
                                />
                            </Form.Group>

                            <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                                <Form.Label>PostBy</Form.Label>
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
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="describe" name="describe" />
                            </Form.Group>
                        </div>
                        <div className={cx('image_preview')}>
                            {imageValue ? (
                                <div className={cx('item_movie')}>
                                    <div className={cx('item_image')}>
                                        <img className={cx('image_movie')} src={imageValue} />
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
                                                        <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                        <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                        <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                        <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
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

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames/bind';
import style from './CreatEmployee.module.scss';

const cx = classnames.bind(style);

function CreatEmployee() {
    return (
        <div className={cx('create_film')}>
            <Form method="POST" action="http://localhost:5000/employee/saveEmployee" className={cx('container_form')}>
                <div className={cx('form_block')}>
                    <div className={cx('form_block-1')}>
                        <Form.Group className={cx('mb-3')} controlId="formBasicEmail">
                            <Form.Label> Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the name"
                                name="name"
                                className={cx('text_input')}
                            />
                        </Form.Group>

                        <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Director"
                                name="director"
                                className={cx('text_input')}
                            />
                        </Form.Group>
                        <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                            <Form.Label>Writer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Director"
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
                            <Form.Control type="text" placeholder="Image" name="image" className={cx('text_input')} />
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
                    </div>
                </div>

                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="describe" name="describe" />
                </Form.Group>

                <div className={cx('block_submit')}>
                    {' '}
                    <Button variant="primary" type="submit" className={cx('btn_submit')}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreatEmployee;

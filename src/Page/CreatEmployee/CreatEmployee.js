import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames/bind';
import style from './CreatEmployee.module.scss';

const cx = classnames.bind(style);

function CreatEmployee() {
    return (
        <div className={cx('create_film')}>
            <Form className={cx('mt-5 ml-5 mr-5')} method="POST" action="http://localhost:5000/employee/saveEmployee">
                <Form.Group className={cx('mb-3')} controlId="formBasicEmail">
                    <Form.Label> Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name" name="name" />
                </Form.Group>

                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" placeholder="Director" name="director" />
                </Form.Group>
                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" placeholder="Director" name="writer" />
                </Form.Group>
                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>TimeMovie</Form.Label>
                    <Form.Control type="text" placeholder="timeMovie" name="timeMovie" />
                </Form.Group>
                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="describe" name="describe" />
                </Form.Group>
                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Main Actor</Form.Label>
                    <Form.Control type="text" placeholder="mainActor" name="mainActor" />
                </Form.Group>
                <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example" className={cx('ml-4')} name="category" required>
                        <option value="">--Thể Loại --</option>
                        <option value="love">Love</option>
                        <option value="rap">Rap</option>
                        <option value="pop">Pop</option>
                        <option value="ballad">Ballad</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Image" name="image" />
                </Form.Group>

                <Form.Group className={cx('mb-3')} controlId="formBasicPassword">
                    <Form.Label>VideoID</Form.Label>
                    <Form.Control type="text" placeholder="VideoID" name="videoID" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CreatEmployee;

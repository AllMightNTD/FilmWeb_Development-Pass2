import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames/bind';
import style from './CreatEmployee.module.scss';

const cx = classnames.bind(style);

function CreatEmployee() {
    return (
        <div className={cx('create_film')}>
            <Form className={cx('mt-5 ml-5 mr-5')} method="POST" action="http://localhost:5000/employee/saveEmployee">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name" name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" name="description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Category" name="category" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Image" name="image" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
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

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
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" name="description" />
                </Form.Group>

                <Form.Group className={cx('mb-3 scrollable')} controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example" className={cx('ml-4')} name="category" required>
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

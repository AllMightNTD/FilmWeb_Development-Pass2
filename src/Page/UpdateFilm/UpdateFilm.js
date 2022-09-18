import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './UpdateFilm.module.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function UpdateFilm() {
    // Lấy ra id
    const params = useParams();
    // Lấy id mình click vào lưu vào biến id
    const { id } = params;
    const [dataFilm, setDataFilm] = useState({});

    const cx = classNames.bind(style);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${id}/edit`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);
    console.log(dataFilm);
    return (
        <div className={cx('update_film')}>
            <Form className="ml-5 mr-5" method="POST" action={`http://localhost:5000/employee/${id}?_method=PUT`}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Name</Form.Label>
                    <Form.Control type="text" placeholder={dataFilm.name} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        type="text"
                        placeholder={dataFilm.description}
                        name="description"
                    />
                </Form.Group>

                <Form.Group clasName="mb-3" controlId="formBasicPassword">
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder={dataFilm.image} name="image" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>VideoID</Form.Label>
                    <Form.Control type="text" placeholder={dataFilm.videoID} name="videoID" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateFilm;

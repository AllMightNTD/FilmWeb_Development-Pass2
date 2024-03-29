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
            .get(`http://localhost:2000/employee/${id}/edit`)
            .then((response) => setDataFilm(response ? response.data : []))
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);
    console.log(dataFilm);

    const CategoryMap = [
        {
            text:"Thể loại",
            value:""
        },
        {
            text:"Tình Cảm",
            value:"love"
        },
        {
            text:"Hành Động",
            value:"act"
        },
        {
            text:"Trinh Thám",
            value:"detective"
        },
        {
            text:"Thần Thoại",
            value:"legend"
        },
        {
            text:"Âm Nhạc",
            value:"music"
        },
        {
            text:"Khoa Học",
            value:"science"
        },
        {
            text:"Lịch Sử",
            value:"history"
        },
        {
            text:"Kiếm Hiệp",
            value:"hero"
        },
        {
            text:"Hoạt Hình",
            value:"cartoon"
        },
        {
            text:"Chiến Tranh",
            value:"war"
        },
        {
            text:"Hình Sự",
            value:"criminal"
        },
        {
            text:"Kinh Dị",
            value:"horrified"
        },
        {
            text:"Thể Thao",
            value:"sport"
        },
        {
            text:"Học Đường",
            value:"school"
        },

    ]

    return (
        <div className={cx('update_film')}>
            <Form
                className={cx('container_form')}
                method="POST"
                action={`http://localhost:5000/employee/${id}?_method=PUT`}
            >
                <div className={cx('form_block')}>
                    <div className={cx('form_block-1')}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Name</Form.Label>
                            <Form.Control type="text" placeholder={dataFilm.name} name="name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Director</Form.Label>
                            <Form.Control type="text" placeholder={dataFilm.director} name="director" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Main Actor</Form.Label>
                            <Form.Control type="text" placeholder={dataFilm.mainActor} name="mainActor" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Writer</Form.Label>
                            <Form.Control type="text" placeholder={dataFilm.writer} name="writer" />
                        </Form.Group>
                    </div>

                    <div className={cx('form_block-2')}>
                        <Form.Group clasName="mb-3" controlId="formBasicPassword" style={{ marginBottom: '16px' }}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                className={cx('ml-4')}
                                name="category"
                                required
                            >
                                {
                                    CategoryMap.map((category , index) => (
                                        <option key={index} value={category.value}>{category.text}</option>
                                    ))
                                }
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
                    </div>
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" placeholder={dataFilm.describe} name="describe" />
                </Form.Group>

                <div className={cx('block_submit')}>
                    {' '}
                    <Button variant="primary" type="submit" className={cx('btn_submit')}>
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default UpdateFilm;

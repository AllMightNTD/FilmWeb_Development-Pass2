import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames/bind';
import style from './ListEmployee.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import UseWindowDemension from '../../hooks/useWindowDemension';
import Container from 'react-bootstrap/Container';
import $ from 'jquery';
function ListEmployee() {
    const cx = classnames.bind(style);
    const [dataFilm, setDataFilm] = useState([]);

    // Số dữ liệu xóa
    const [deletedCount, setDeletedCount] = useState();

    const [checkedAll, setCheckedAll] = useState(false);

    // Disabled button
    const [isDisabled, setDisabled] = useState(true);
    // Show model xóa
    const [show, setShow] = useState(false);

    // Id xóa
    const [id, setID] = useState();

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleData = (idFake) => {
        setID(idFake);
        setShow(true);
    };

    // DOM
    var usersItemcheckbox = $('input[name="usersID[]"');
    console.log(usersItemcheckbox);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handlePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const handlePage = (number) => {
        setActive(number);
        setPage(number);
        console.log(number);
    };

    useEffect(() => {
        // Get link lấy ra dữ liệu là 1 object bao gồm 1 mảng và 1 count(số dữ liệu xóa )
        axios
            .get(`http://localhost:5000/me/storedEmloyee?page=${page}&type=less`)
            .then((myData) => {
                console.log(myData.data);
                // Set data dữ liệu
                setDataFilm(myData.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [page]);

    useEffect(() => {
        // Get link lấy ra dữ liệu là 1 object bao gồm 1 mảng và 1 count(số dữ liệu xóa )
        axios
            .get(`http://localhost:5000/me/deleteCount`)
            .then((myData) => {
                console.log(myData.data);
                // Set data dữ liệu
                setDeletedCount(myData.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [deletedCount]);

    // console.log(id);
    // Xử lý click vào checkAll
    const handleCheckAll = () => {
        setCheckedAll(!checkedAll);
        if (checkedAll == false) {
            setDisabled(false);
            usersItemcheckbox.prop('checked', true);
        } else {
            setDisabled(true);
            usersItemcheckbox.prop('checked', false);
        }
    };

    usersItemcheckbox.change(function () {
        // Lấy ra số lượng input đang check và so sánh với tất cả số lượng các input item
        // Nếu bằng nhau => checked cái CheckAll
        // Không bằng nhau thì bỏ check
        var isCheckedAll = usersItemcheckbox.length === $('input[name="usersID[]"]:checked').length;
        console.log(isCheckedAll);
        if (isCheckedAll == false) {
            setCheckedAll(false);
        } else {
            setCheckedAll(true);
        }
        renderExcuteButton();
    });
    function renderExcuteButton() {
        // Lấy ra số lượng input đang check
        var checkedCount = $('input[name="usersID[]"]:checked').length;
        console.log(checkedCount);
        if (checkedCount > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    // Thay đổi giao diện tùy theo độ rộng màn
    const { width, height } = UseWindowDemension();

    const [isTableMobile, setTableMobile] = useState(false);

    useEffect(() => {
        if (width <= 734) {
            setTableMobile(true);
        } else {
            setTableMobile(false);
        }
    }, [width]);

    return (
        <div className={cx('list_film')}>
            <form method="POST" action="http://localhost:5000/employee/handle-form-action">
                <div className={cx('Request_film')}>
                    <a href="/trash" className={cx('trash_film')} style={{ textDecoration: 'none' }}>
                        <h3>
                            <FontAwesomeIcon icon={faTrash} className={cx('icon_trash')} />({deletedCount})
                        </h3>
                    </a>

                    <Link to="/create" className={cx('button_create-film')} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faSquarePlus} className={cx('icon_create')} />
                        <button>Tạo Phim</button>
                    </Link>
                </div>
                <div className={cx('modal_request')}>
                    <Form.Check
                        type="checkbox"
                        checked={checkedAll}
                        id={`delete-checkbox`}
                        label={`Chon tat ca`}
                        className={cx('check_all-icon')}
                        onChange={handleCheckAll}
                    />
                    <Form.Select className={cx('select_option-form')} name="action" style={{ width: '200px' }} required>
                        <option value="">--Hành Động --</option>
                        <option value="delete">Xóa</option>
                    </Form.Select>
                    <button id="checkall-submit-btn" type="submit" className={cx('submit_btn')} disabled={isDisabled}>
                        Thuc hien
                    </button>
                </div>
                <Table striped bordered hover className={cx('mt-3 table')}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Name</th>
                            <th style={{ display: `${isTableMobile ? 'none' : ''}` }}>Category</th>
                            <th style={{ display: `${isTableMobile ? 'none' : ''}` }}>Create time</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Hàm map : biến đầu là dữ liệu , biến sau là chi mục {index}
                            dataFilm.map((dataItem, index) => (
                                <tr key={index}>
                                    <th>
                                        <input type="checkbox" value={dataItem._id} name="usersID[]" />
                                    </th>
                                    <th>{index + 1}</th>
                                    <th>{dataItem.name}</th>
                                    <th style={{ display: `${isTableMobile ? 'none' : ''}` }}>{dataItem.category}</th>
                                    <th style={{ display: `${isTableMobile ? 'none' : ''}` }}>{dataItem.createdAt}</th>
                                    <th>
                                        <div className={cx('setting_data-table')}>
                                            <a
                                                href={`/EditFilm/${dataItem._id}`}
                                                // Margin bottom giữa 2 nút khi trên màn mobile
                                                style={{ marginBottom: `${isTableMobile ? '10px' : ''}` }}
                                                className={cx('btn btn-danger')}
                                            >
                                                Sửa
                                            </a>

                                            {/* Khi click vào button xóa  */}
                                            {/* Gọi đến link trong action với phương thức DELETE */}
                                            {/* Bên database nhận lại id và xóa theo ID */}
                                            <Button
                                                type="submit"
                                                variant="danger"
                                                onClick={() => handleData(dataItem._id)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                {
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn xóa </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                            <form method="POST" action={`http://localhost:5000/employee/${id}?_method=DELETE`}>
                                <Button variant="danger" type="submit">
                                    Xóa
                                </Button>
                            </form>
                        </Modal.Footer>
                    </Modal>
                }
            </form>
            <div className={cx('Pagination_page')}>
                <Pagination size="sm" className={cx('item_Pagi')}>
                    {items}
                </Pagination>
                <br />
            </div>
        </div>
    );
}

export default ListEmployee;

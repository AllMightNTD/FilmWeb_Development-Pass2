import Table from 'react-bootstrap/Table';
import classNames from 'classnames/bind';
import style from './TrashEmployee.module.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import $ from 'jquery';

const cx = classNames.bind(style);
function TrashEmployee() {
    const [dataTrash, setDataTrash] = useState([]);
    const [show, setShow] = useState(false);
    const [idforce, setIDForce] = useState();

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleData = (idFake) => {
        setIDForce(idFake);
        setShow(true);
    };
    useEffect(() => {
        axios
            .get('http://localhost:2000/me/trash')
            .then((response) => setDataTrash(response ? response.data : []))
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    console.log(dataTrash);
    console.log(idforce);

    // Xử lí khôi phục all
    const [checkedAll, setCheckedAll] = useState(false);

    // Disabled button
    const [isDisabled, setDisabled] = useState(true);

    const usersItemcheckbox = $('input[name="usersID[]');

    // Hàm xử lý checkAll
    // Đang bật thì tắt , đang tắt thì bật
    const handleCheckAll = () => {
        setCheckedAll(!checkedAll);
        setDisabled(!isDisabled);

        if (checkedAll=== false) {
            // setDisabled(false);
            usersItemcheckbox.prop('checked', true);
            // Nếu checkedAll được check => hiện button submit
        } else {
            setDisabled(true);
            usersItemcheckbox.prop('checked', false);
        }
    };

    // Xử lý sự thay đổi của checkBox Item con
    usersItemcheckbox.change(function () {
        // Select ra các thằng đang checked và đếm số
        // Nếu nó bằng với số lượng checkItem => setCheckedAll = true
        // Ngược lại là false
        var isCheckedAll = usersItemcheckbox.length=== $('input[name="usersID[]"]:checked').length;
        // Không bằng
        if (isCheckedAll=== false) {
            setCheckedAll(false);
            // Bằng
        } else {
            setCheckedAll(true);
        }
        // Gọi hàm xử lý ẩn hiện button submit
        renderButtonSubmit();
    });

    // Hàm xử lý ẩn hiện button
    function renderButtonSubmit() {
        // Lấy ra số checkboxItem con đang check
        var checkedCount = $('input[name="usersID[]"]:checked').length;
        if (checkedCount > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('trash_container')}>
                <form method="POST" action="http://localhost:2000/employee/handle-restore-data">
                    <a href="/listemployee" className={cx('list_film')} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faList} />
                        <p>Danh sách phim</p>
                    </a>
                    <div className={cx('d-flex mb-4')} style={{ alignItems: 'center' }}>
                        <Form.Check
                            type="checkbox"
                            checked={checkedAll}
                            id={`delete-checkbox`}
                            label={`Chon tat ca`}
                            style={{ marginLeft: '20px' }}
                            // Hàm xử lý check ALL được gọi khi click
                            onChange={handleCheckAll}
                        />
                        <Form.Select
                            aria-label="Default select example"
                            className={cx('ml-4')}
                            name="action"
                            style={{ width: '200px', marginLeft: '10px', marginRight: '10px' }}
                            required
                        >
                            <option value="">--Hành Động --</option>
                            <option value="restore">Khôi Phục</option>
                        </Form.Select>
                        <button
                            id="checkall-submit-btn"
                            type="submit"
                            class="btn btn-sm btn-primary ml-4"
                            // disabled : ẩn hoặc hiên (ẩn : không submit được)
                            disabled={isDisabled}
                        >
                            Thực Hiện
                        </button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>#</th>
                                <th>Name</th>
                                <th>Creat Time</th>
                                <th>Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTrash.length > 0 ? (
                                dataTrash.map((dataItem, index) => (
                                    <tr key={index}>
                                        <input
                                            className="ml-4 mt-4"
                                            type="checkbox"
                                            // Value là id
                                            value={dataItem._id}
                                            // Đặt name là 1 mảng
                                            name="usersID[]"
                                        />
                                        <th>{index + 1}</th>
                                        <th>{dataItem.name}</th>
                                        <th>{dataItem.createdAt}</th>
                                        <th>
                                            <div style={{ display: 'flex' }}>
                                                <form
                                                    method="POST"
                                                    action={`http://localhost:2000/employee/${dataItem._id}/restore?_method=PATCH`}
                                                >
                                                    <Button className={cx('btn btn-danger')} type="submit">
                                                        Khôi phục
                                                    </Button>
                                                </form>

                                                {/* Khi click vào button xóa  */}
                                                {/* Gọi đến link trong action với phương thức DELETE */}
                                                {/* Bên database nhận lại id và xóa theo ID */}
                                                <Button
                                                    type="submit"
                                                    variant="danger"
                                                    onClick={() => handleData(dataItem._id)}
                                                >
                                                    Xóa Vĩnh Viễn
                                                </Button>
                                            </div>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <p>
                                    Thùng rác trống
                                    <Link to="/listemployee">Quay lại danh sách phim</Link>
                                </p>
                            )}
                        </tbody>
                    </Table>

                    {
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Hành động này sẽ không thể khôi phục . Bạn có chắc muốn xóa ???</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Hủy
                                </Button>

                                {/* Xóa vĩnh viễn với id */}
                                <form
                                    method="POST"
                                    action={`http://localhost:2000/employee/${idforce}/force?_method=DELETE`}
                                >
                                    <Button variant="danger" type="submit">
                                        Xóa
                                    </Button>
                                </form>
                            </Modal.Footer>
                        </Modal>
                    }
                </form>
            </div>
        </div>
    );
}

export default TrashEmployee;

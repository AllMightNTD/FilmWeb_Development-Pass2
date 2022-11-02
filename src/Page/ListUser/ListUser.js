import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import style from './ListUser.module.scss';
import Pagination from 'react-bootstrap/Pagination';
import UseWindowDemension from '../../hooks/useWindowDemension';
function ListUser() {
    const cx = classnames.bind(style);
    const [dataUser, setDataUser] = useState([]);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    let items = [];

    // Phân trang dữ liệu
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
            .get(`http://localhost:5000/accounts/listUser?page=${page}&type=less`)
            .then((myData) => {
                console.log(myData.data);
                // Set data dữ liệu
                setDataUser(myData.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [page]);
    console.log(dataUser);

    return (
        <div className={cx('list_film')}>
            <Table striped bordered hover className={cx('mt-3 table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Hàm map : biến đầu là dữ liệu , biến sau là chi mục {index}
                        dataUser.map((dataItem, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{dataItem.username}</th>
                                <th>{dataItem.email}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <div className={cx('Pagination_page')}>
                <Pagination size="sm" className={cx('item_Pagi')}>
                    {items}
                </Pagination>
                <br />
            </div>
        </div>
    );
}

export default ListUser;

import classNames from 'classnames/bind';
import style from './Myprofile.module.scss';
import AppContext from '../../Components/AppConText';
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Image from '../../Components/Image';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Myprofile() {
    const { state, dispatch } = useContext(AppContext);
    // Lấy state ra : chính là cái user , object trong đó có username
    const { user } = state;
    console.log(user);
    const [dataPost, setDataPost] = useState([]);
    const [checkModal, setCheckModal] = useState(false);
    const [check, setCheck] = useState(false);

    var idUser;
    if (user) {
        idUser = user.id;
    }

    async function handleSubmitSignIn(event) {
        event.preventDefault();
        const result = await fetch('http://localhost:5000/accounts/api/MyPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser,
            }),
        }).then((res) => res.json());
        if (result.status === 'ok') {
            console.log(result.data);
            setDataPost(result.data);
        } else {
            alert(result.error);
        }
    }

    return (
        <div className={cx('container_main')}>
            <div className={cx('container')}>
                <div className={cx('user')}>
                    <div className={cx('avatar')}>
                        {user ? (
                            <Image
                                src="https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/307710303_418354093707451_3724584447684544601_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mLRf4N1IDhIAX_XvXcI&_nc_ht=scontent.fhan2-1.fna&oh=00_AfAVExNUGRPbSK8C2MO3cvA_-tPy0FB4dWaqZUakurYsrA&oe=637BB773"
                                className={cx('image_avatar')}
                            ></Image>
                        ) : (
                            <></>
                        )}
                    </div>
                    {user ? (
                        <div className={cx('info')}>
                            <span className={cx('name')}>{user.userName}</span>
                            <p className={cx('email')}>{user.email}</p>
                            <div className={cx('option_info')}>
                                <form onSubmit={handleSubmitSignIn}>
                                    <button
                                        className={cx('btn_my-post')}
                                        type="submit"
                                        onClick={() => setCheck(!check)}
                                    >
                                        My Posts
                                    </button>
                                </form>
                                <button className={cx('btn_Editprofile')}>Edit Profile</button>
                                <button className={cx('btn_settings')} onClick={() => setCheckModal(!checkModal)}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {check && user ? (
                    <div className={cx('My_post')}>
                        <Table striped bordered hover className={cx('mt-3 table')}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Director</th>
                                    <th>Writer</th>
                                    <th>Category</th>
                                    <th>Nation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // Hàm map : biến đầu là dữ liệu , biến sau là chi mục {index}
                                    dataPost ? (
                                        dataPost.map((dataItem, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{dataItem.name}</th>
                                                <th>{dataItem.director}</th>
                                                <th>{dataItem.writer}</th>
                                                <th>{dataItem.category}</th>
                                                <th>{dataItem.Nation}</th>
                                            </tr>
                                        ))
                                    ) : (
                                        <></>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <></>
                )}
                {checkModal ? (
                    <div className={cx('Modal_settings')}>
                        <ul className={cx('setting_list')}>
                            <li className={cx('setting_item')}>Change password</li>
                            <li className={cx('setting_item')}>QR Code</li>
                            <li className={cx('setting_item')}>Apps and Websites</li>
                            <li className={cx('setting_item')}>Notifications</li>
                            <li className={cx('setting_item')}>Privacy and Security</li>

                            <li className={cx('setting_item')}>Login Activity </li>
                            <li className={cx('setting_item')}>Emails from Facebook</li>

                            <li className={cx('setting_item')}>Log Out</li>
                            <li className={cx('setting_item')} onClick={() => setCheckModal(false)}>
                                Cancel
                            </li>
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Myprofile;

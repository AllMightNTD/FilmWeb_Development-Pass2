import classNames from 'classnames/bind';
import style from './SearchValue.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Components/Image';
const cx = classNames.bind(style);
function SearchValue() {
    const params = useParams();
    const [dataFilm, setDataFilm] = useState([]);
    const { searchValue } = params;
    console.log(searchValue);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/optionFilm/${searchValue}`)
            .then((response) => setDataFilm(response ? response.data.data.productsFilm : []))
            .catch((error) => console.log(error));
    }, [searchValue]);
    console.log('Data product', dataFilm);
    return (
        <div className={cx('container_category')}>
            <h3 className={cx('title_search')}>
                KẾT QUẢ TÌM KIẾM:
                {searchValue}
            </h3>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    {dataFilm ? (
                        dataFilm.map((item, index) => (
                            <div key={index} className={cx('col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 mb-4')}>
                                <Link to={`/MovieDetail/${item.slug}`} className={cx('item_movie')}>
                                    <div className={cx('item_image')}>
                                        <Image className={cx('image_movie')} src={item.image} />
                                    </div>
                                    <div className={cx('infor_item-movie')}>
                                        <h5 className={cx('title_movie-item')}>{item.name}</h5>
                                        <span className={cx('actor_movie-item')}>{item.director}</span>
                                        <div className={cx('time_zone-item')}>
                                            <div className={cx('all_block-zone')}>
                                                <div className={cx('time_item')}>
                                                    <FontAwesomeIcon
                                                        icon={faClockRotateLeft}
                                                        className={cx('clock_icons')}
                                                    />
                                                    <span className={cx('time')}>{item.timeMovie}</span>
                                                </div>
                                                <div className={cx('stars_movie-item')}>
                                                    <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('star_icon')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchValue;

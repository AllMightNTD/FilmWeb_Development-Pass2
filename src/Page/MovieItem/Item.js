import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import classnames from 'classnames/bind';
import style from './MovieItem.module.scss';

const cx = classnames.bind(style);

function MovieItem({ data }) {
    return (
        <Col xl={3} lg={3} md={3} sm={4} xs={12} className={cx('col_item')}>
            <div key={data.id} className={cx('block_data')}>
                <Link className={cx('Link_image')} to={`/MovieDetail/${data.slug}`}>
                    <img className={cx('image_movie')} src={data.image} alt={data.name} />
                </Link>

                <Link to={`/MovieDetail/${data.slug}`} style={{ textDecoration: 'none' }} className={cx('info_movie')}>
                    <p className={cx('title_movie')}>{data.name}</p>
                    <span className={cx('description_movie')}>{data.description}</span>
                </Link>
            </div>
        </Col>
    );
}

export default MovieItem;

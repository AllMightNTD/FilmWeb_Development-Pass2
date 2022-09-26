import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import classnames from 'classnames/bind';
import style from './MovieItem.module.scss';

const cx = classnames.bind(style);

function MovieItem({ data }) {
    return (
        <Col xl={3} lg={3} md={3} sm={4} xs={12} className={cx('col_item')}>
            <Link to={`/MovieDetail/${data.slug}`} key={data.id} className={cx('block_data')}>
                <div className={cx('Link_image')}>
                    <img className={cx('image_movie')} src={data.image} alt={data.name} />
                </div>

                <div style={{ textDecoration: 'none' }} className={cx('info_movie')}>
                    <p className={cx('title_movie')}>{data.name}</p>
                    <span className={cx('description_movie')}>{data.mainActor}</span>
                </div>
            </Link>
        </Col>
    );
}

export default MovieItem;

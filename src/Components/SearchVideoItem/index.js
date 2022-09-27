import classNames from 'classnames/bind';
import style from './SearchVideoItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function VideoItem({ data }) {
    console.log(data);
    return (
        // Để thẻ Link bị load chậm
        <a href={`/MovieDetail/${data.slug}`} className={cx('wrapper')} style={{ textDecoration: 'none' }}>
            <div className={cx('image_item')}>
                <img className={cx('thumbnail_video')} src={data.image} alt={data.name} />
            </div>
            <div className={cx('info_video')}>
                <h4 className={cx('name')}>{data.name}</h4>
                <span className={cx('description')}>{data.director}</span>
            </div>
        </a>
    );
}

export default VideoItem;

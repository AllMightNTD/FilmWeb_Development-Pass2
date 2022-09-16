import style from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(style);
function WatchMovie() {
    const params = useParams();
    const { slug } = params;

    const [dataWatch, setdataWatch] = useState([]);
    console.log(slug);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/employee/${slug}`)
            .then((response) => setdataWatch(response ? response.data : []))
            .catch((error) => console.log(error));
    }, []);

    console.log(dataWatch);

    return (
        <div className={cx('container')}>
            <div className={cx('content_watch')}>
                <div className={cx('info_watch')}>
                    <img className={cx('image_watch')} src={dataWatch.image}></img>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>{dataWatch.name}</h3>
                        <p className={cx('description')}>{dataWatch.description}</p>

                        <div className={cx('detai_watch')}>
                            <span>
                                Tội Phạm Emily CAM Vietsub + Thuyết minh, Emily the Criminal 2022 Tội Phạm Emily Không
                                may mắn và nợ nần chồng chất, Emily dính vào một vụ lừa đảo thẻ tín dụng kéo cô vào thế
                                giới ngầm tội phạm ở Los Angeles, cuối cùng dẫn đến hậu quả chết người.[Xem thêm]
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('film_watch-now')}>
                    <iframe
                        width="650"
                        height="365"
                        src={`https://www.youtube.com/embed/${dataWatch.videoID}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default WatchMovie;

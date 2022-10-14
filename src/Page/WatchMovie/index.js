import style from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
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

    const [number, setNumber] = useState(5);
    const [checkSkip, setCheckSkip] = useState(false);
    const [checkSkipFilm, setCheckSkipFilm] = useState(false);

    // Check hiển thị / ẩn nút skip
    const [checkHideButtonSkip, setCheckHideButtonSkip] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setNumber(number - 1);
            if (number === 0) {
                setNumber(0);
                setCheckSkip(true);
            }
        }, 1000);
    }, [number]);

    console.log(checkSkip);

    console.log(number);

    const filmGood =
        'https://scontent.cdninstagram.com/v/t39.25447-2/10000000_1529846804145158_7067454641157942414_n.mp4?_nc_cat=100&vs=bf14758b81a3dc4d&_nc_vs=HBksFQAYJEdJQ1dtQUFHWkZJM1kyOEZBSTZzWnhpTnBCUmlibWRqQUFBRhUAAsgBABUAGCRHSUNXbUFEemJFTkhLVDhDQUY0T1FNTWpzZXgyYnJGcUFBQUYVAgLIAQBLB4gScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AHXVzZV9sYW5jem9zX2Zvcl92cW1fdXBzY2FsaW5nABFkaXNhYmxlX3Bvc3RfcHZxcwAVACUAHAAAJuSv9rLp%2BYsCFZBOKAJDMxgLdnRzX3ByZXZpZXccF0Csm1Jul41QGClkYXNoX2k0bGl0ZWJhc2ljXzVzZWNnb3BfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsPiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV9yb2lfbm90ZQtwcm9ncmVzc2l2ZRFvZW1fcm9pX3VzZXJfdGllcgAeb2VtX3JvaV9wcmVkaWN0ZWRfd2F0Y2hfdGltZV9zATAWb2VtX3JvaV9yZWNpcGVfYmVuZWZpdAUwLjAwMCVvZW1fcm9pX3N0YXRpY19iZW5lZml0X2Nvc3RfZXZhbHVhdG9yC3Byb2dyZXNzaXZlDG9lbV92aWRlb19pZBA1MDQwMjEyOTE2MDg1MzU4Em9lbV92aWRlb19hc3NldF9pZBAxMjk4MDMwNzg0MzExODc4FW9lbV92aWRlb19yZXNvdXJjZV9pZA81ODkyMzIxMTk2NjM2MDIcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZA83ODk3NTAzMDg5Mjc2NjkOdnRzX3JlcXVlc3RfaWQPZGEzNDNkM2M2NTc3NGZiJQIcHBwV8OYXGwFVAAIbAVUAAhwVAgAAABaAurcDACXEARsHiAFzAzQ2MQJjZAoyMDIyLTEwLTEzA3JjYgEwA2FwcAVWaWRlbwJjdBlDT05UQUlORURfUE9TVF9BVFRBQ0hNRU5UE29yaWdpbmFsX2R1cmF0aW9uX3MIMzY2MS43MTgCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=41a7d5&_nc_ohc=JUFIoWaZ06cAX_jQq0t&_nc_ht=scontent-dus1-1.xx&edm=APRAPSkEAAAA&oh=00_AT_nD3vc34xEojk3LkNx-kJ5znnNqGP2T1JkcQC7w6UJcg&oe=634D9936&_nc_rid=826149214188751';
    const advertisement = 'https://sponsor.imacdn.com/ff/i999-360.mp4';

    const handleSkipAdvertisement = () => {
        setCheckSkipFilm(true);
        setCheckSkip(false);
        setCheckHideButtonSkip(false);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('main_film')}>
                {/* <ReactPlayer
                    controls
                    width={'100%'}
                    className={cx('film_clone-data')}
                    onReady={() => console.log('Ready')}
                    onStart={() => console.log('Start')}
                    onPause={() => console.log('Pause')}
                    onEnded={() => console.log('Ended')}
                    url={`https://www.youtube.com/watch?v=${dataWatch.videoID}`}
                /> */}
                <video
                    src={checkSkipFilm ? filmGood : advertisement}
                    autoPlay
                    preload="auto"
                    playsInline
                    className={cx('player_video')}
                    controls
                ></video>

                {checkHideButtonSkip ? (
                    <div className={cx('button_skip')} onClick={handleSkipAdvertisement}>
                        {checkSkip ? <button>Skip</button> : <button>{number}</button>}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default WatchMovie;
//

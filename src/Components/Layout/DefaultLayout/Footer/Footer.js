import classnames from 'classnames/bind';
import style from './footer.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
const cx = classnames.bind(style);

const footer_List = [
    {
        name: 'Audio and Subtitles',
    },
    {
        name: 'Media Center',
    },
    {
        name: 'Privacy',
    },
    {
        name: 'Audio Description',
    },
    {
        name: 'Investor Relations',
    },
    {
        name: 'Jobs',
    },
    {
        name: 'Cookie Preferences',
    },
    {
        name: 'Gift Card',
    },
    {
        name: 'Team of Use ',
    },
];

function Footer() {
    return (
        <div className={cx('footer')}>
            {/* <div className={cx('footer_container')}>
                <div className={cx('container-fluid text-3xl mb-5 underline')}>
                    <Link to="/" className={cx('title_film')}>
                        NTD_FILM
                    </Link>
                    <div className={cx('row')}>
                        {footer_List.map((data, index) => (
                            <a
                                key={index}
                                href="#"
                                className={cx('col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mt-2 select_item ')}
                            >
                                <span className={cx('select_item')}>{data.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className={cx('contact_to')}>
                    <a href="https://www.facebook.com/profile.php?id=100065985903525">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.instagram.com/ntd_o2/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://twitter.com/home">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.youtube.com/channel/UCVltcNihvMs4Q8jEye330Gw">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>
            </div> */}
        </div>
    );
}

export default Footer;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import VideoItem from '../../SearchVideoItem';
import classNames from 'classnames/bind';
import style from './Search.module.scss';
import axios from 'axios';
import { useDebounce } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Search({ width }) {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setsearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const navigate = useNavigate();
    // Sử dụng useDebounce
    const debounce = useDebounce(searchValue, 1000);

    // Xử lý giá trị search
    const hanldeSearchValue = (e) => {
        const value = e.target.value;

        // Không cho bắt đầu bằng khoảng trắng
        if (!value.startsWith(' ')) {
            setsearchValue(value);
        }
    };

    const handleClearSearch = () => {
        setsearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!debounce.trim()) {
            return;
        }
        setLoading(true);
        axios
            .get(`http://localhost:5000/search?q=${encodeURIComponent(debounce)}&type=less`)
            .then((response) => {
                // Dữ liệu get ra được
                setSearchResult(response ? response.data.data.productsFilm : []);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                setLoading(false);
                console.log(error);
            });
    }, [debounce]);

    async function handleSubmitSearch(event) {
        event.preventDefault();

        const result = await fetch('http://localhost:5000/optionFilm/searchresult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchValue,
            }),
        }).then((res) => res.json());
        // Nếu tìm được dữ liệu thì mới chuyển trang navigate
        if (result.status === 'ok') {
            console.log('Day la data tim kiem', result.data);
            navigate(`/search-film/${searchValue}`);
        } else {
            alert(result.error);
        }
    }

    return (
        <Tippy
            interactive
            // Có dữ liệu , có truyền tìm kiếm thì mới hiển thị
            visible={showResult && searchResult.length > 0 && searchValue != '' ? true : false}
            render={(attrs) => (
                // Để ý cái dấu {} phải có từ return
                // Còn dấu ( ) thì không return

                <div className={cx('search_result')} style={{ width: width }} tabIndex="-1" {...attrs}>
                    {loading && (
                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                    {searchResult.map((item) => (
                        <VideoItem data={item} />
                    ))}
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <form onSubmit={handleSubmitSearch}>
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className="input_search"
                        name="searchValue"
                        type="text"
                        placeholder="Search video..."
                        spellCheck={false}
                        onChange={hanldeSearchValue}
                        // Focus vào thì show lại kết quả tìm kiếm
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {/* Clear */}
                    {/* Có searchValue hiện X */}
                    {/* Có value và không có Loading */}
                    {/* {searchValue && (
                        <button className={cx('clear')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )} */}
                    {/* Loading  */}
                    {/* {loading && (
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )} */}

                    <button type="submit" className={cx('search_button')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </form>
        </Tippy>
    );
}

export default Search;

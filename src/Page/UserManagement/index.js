import classNames from 'classnames/bind';
import style from './UserAdmin.module.scss';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(style);
function UserAdminCheck() {
    const navigate = useNavigate();
    const quizData = [
        {
            question: 'Admin tên gì ?',
            a: 'Nguyễn Tiến Dũng',
            b: 'Nguyễn Văn Sang',
            c: 'Bùi Văn Cung',
            d: 'Lương Thế Vinh',
            correct: 'Nguyễn Tiến Dũng',
        },
        {
            question: 'Admin quê ở đâu ?',
            a: 'Nghệ An',
            b: 'Hà Nội',
            c: 'Thái Bình',
            d: 'Hải Dương',
            correct: 'Hà Nội',
        },
        {
            question: 'Thời sinh viên Admin  học ngành gì , trường nào ?',
            a: 'CNTT , Đại Học Bách Khoa HN',
            b: 'BMTT , Đại Học Kinh Doanh và Công Nghệ',
            c: 'KHMT , Đại Học Xây Dựng',
            d: 'CNTT , Đại Học Bách Khoa TP Hồ Chí Minh',
            correct: 'KHMT , Đại Học Xây Dựng',
        },

        {
            question: 'Admin năm nay bao nhiêu tuổi',
            a: '20',
            b: '21',
            c: '22',
            d: '18',
            correct: '20',
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const quizDataSet = quizData[currentIndex];
    const [valueChecked, setValueChecked] = useState('');

    const handleSubmitAnswer = () => {
        var checkbox = document.getElementsByName('answer');

        // Lặp qua từng checkbox để lấy giá trị
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked === true) {
                setValueChecked(checkbox[i].value);
            }
        }
    };
    // Đi đến được câu cuối cùng
    if (currentIndex === quizData.length) {
        alert('Congratulations, you have answered all the questions correctly. You are the Admin');
        navigate('/listUser');
        // Chuyển tiếp câu (tăng currentIndex nếu trả lời đúng)
    } else if (valueChecked === quizDataSet.correct) {
        setCurrentIndex(currentIndex + 1);
    }

    return (
        <div className={cx('quiz-container')} id="quiz">
            <div className={cx('quiz-header')}>
                <h1>Check information</h1>
                <div className={cx('question')}>
                    <h2>{quizDataSet.question}</h2>
                </div>
                <ul className={cx('list_answer')}>
                    <div className={cx('group')}>
                        <div className={cx('content')}>
                            <input
                                value={quizDataSet.a}
                                type="radio"
                                name="answer"
                                id="a"
                                className={cx('answer')}
                            ></input>
                            <label for="a">{quizDataSet.a}</label>
                        </div>
                        <div className={cx('content')}>
                            <input
                                type="radio"
                                value={quizDataSet.b}
                                name="answer"
                                id="b"
                                className={cx('answer')}
                            ></input>
                            <label for="b">{quizDataSet.b}</label>
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('content')}>
                            <input
                                type="radio"
                                value={quizDataSet.c}
                                name="answer"
                                id="c"
                                className={cx('answer')}
                            ></input>
                            <label for="c">{quizDataSet.c}</label>
                        </div>
                        <div className={cx('content')}>
                            <input
                                type="radio"
                                value={quizDataSet.d}
                                name="answer"
                                id="d"
                                className={cx('answer')}
                            ></input>
                            <label for="d">{quizDataSet.d}</label>
                        </div>
                    </div>
                </ul>
                <button id="submit" className={cx('submit')} type="submit" onClick={handleSubmitAnswer}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default UserAdminCheck;

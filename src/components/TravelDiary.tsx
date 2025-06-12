import React, { useState } from 'react';
import diaryimg from '../assets/diary.svg'
import underimg from '../assets/post-img.svg'
import photo from '../assets/Group2.svg'
import './TravelDiary.css';

const TravelDiary: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [expense, setExpense] = useState('');

    return (
        <div className='travel-diary-body'>
            <div className="travel-diary-container">
                {/* 왼쪽 섹션 */}
                <div className="left-section">
                    <h1 className="diary-title">Travel<br />Diary</h1>
                    <div className="notebook-illustration">
                        {/* 노트북 일러스트 자리 */}
                        <img
                        src={diaryimg}
                        alt='diaryimg'
                        className='note-img'
                        ></img>
                    </div>
                    <div className="ring-binder">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="ring"></div>
                        ))}
                    </div>
                </div>

                {/* 중앙 섹션 - 사진 업로드 영역 */}
                <div className="center-section">
                    <div className="photo-grid">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className="photo-upload-box">
                                <img
                                src={photo}
                                alt='photo'
                                className='photo-input'
                                ></img>
                            </div>
                        ))}
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className="text-upload-box">
                                <p>글 추가</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 오른쪽 섹션 - 폼 */}
                <div className="right-section">
                    <div className="form-container">
                        {/* Country 입력 */}
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                placeholder="국가를 입력하세요"
                            />
                        </div>

                        {/* Date 선택 */}
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <div className="date-container">
                                <div className="calendar-placeholder">
                                    {/* 달력 컴포넌트 자리 */}
                                    <p>달력 선택</p>
                                </div>
                            </div>
                        </div>

                        {/* Expense 입력 */}
                        <div className="form-group">
                            <label htmlFor="expense">Expense</label>
                            <input
                                type="text"
                                id="expense"
                                value={expense}
                                onChange={(e) => setExpense(e.target.value)}
                                placeholder="비용을 입력하세요"
                            />
                        </div>

                        {/* 업로드 버튼 */}
                        <button className="upload-btn">
                            <span>↑</span>
                        </button>
                    </div>

                    {/* 캐릭터 일러스트 */}
                    <div className="character-illustration">
                        {/* 캐릭터들 자리 */}
                        <img
                        src={underimg}
                        alt='underimg'
                        className='under-img'
                        ></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelDiary;